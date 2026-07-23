declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential?: string }) => void;
            auto_select?: boolean;
          }) => void;
          renderButton: (parent: HTMLElement, options: { type: "standard" | "icon" }) => void;
        };
      };
    };
  }
}

const GOOGLE_SCRIPT_ID = "google-identity-services";
let googleScriptPromise: Promise<void> | null = null;

function loadGoogleScript(): Promise<void> {
  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }

  if (!googleScriptPromise) {
    googleScriptPromise = new Promise((resolve, reject) => {
      const existing = document.getElementById(GOOGLE_SCRIPT_ID) as HTMLScriptElement | null;

      if (existing) {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("Failed to load Google sign-in.")));
        return;
      }

      const script = document.createElement("script");
      script.id = GOOGLE_SCRIPT_ID;
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Google sign-in."));
      document.head.appendChild(script);
    });
  }

  return googleScriptPromise;
}

/**
 * GIS only issues a credential through a button it renders itself, so a hidden
 * real Google button is rendered and clicked programmatically from within the
 * caller's genuine click handler (keeps the trusted user-activation context).
 */
export async function signInWithGoogle(): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    throw new Error("Google sign-in is not configured.");
  }

  await loadGoogleScript();

  return new Promise((resolve, reject) => {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-1000px";
    container.style.left = "-1000px";
    document.body.appendChild(container);

    const cleanup = () => {
      container.remove();
    };

    window.google!.accounts.id.initialize({
      client_id: clientId,
      auto_select: false,
      callback: (response) => {
        cleanup();
        if (response?.credential) {
          resolve(response.credential);
        } else {
          reject(new Error("Google sign-in was cancelled."));
        }
      }
    });

    window.google!.accounts.id.renderButton(container, { type: "standard" });

    const realButton = container.querySelector<HTMLElement>("div[role=button]");

    if (!realButton) {
      cleanup();
      reject(new Error("Google sign-in button failed to render."));
      return;
    }

    realButton.click();

    window.setTimeout(() => {
      if (document.body.contains(container)) {
        cleanup();
        reject(new Error("Google sign-in timed out."));
      }
    }, 60000);
  });
}
