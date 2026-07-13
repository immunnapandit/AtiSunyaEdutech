import {
  Braces,
  LayoutTemplate,
  MonitorCog,
  PenTool,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    label: "Dynamics 365.",
    icon: MonitorCog,
  },
  {
    label: "Azure Cloud.",
    icon: LayoutTemplate,
  },
  {
    label: "Power Platform.",
    icon: PenTool,
    active: true,
  },
  {
    label: "Copilot & AI",
    icon: Braces,
  },
];

const tileStyles = [
  "bg-white",
  "bg-[#faf7ff]",
  "bg-[#393653] text-white",
  "bg-white",
  "bg-[#676cff] text-white",
  "bg-white",
  "bg-[#fff9ff]",
  "bg-white",
  "bg-white",
  "bg-white",
  "bg-[#ff7890] text-white",
  "bg-white",
  "bg-[#189ef5] text-white",
  "bg-white",
  "bg-[#fff8ff]",
  "bg-[#ffd6b2]",
];

function MiniButtonTile() {
  return (
    <div className="space-y-3 p-5">
      <div className="flex h-11 items-center justify-center rounded bg-gradient-to-r from-[#3867ff] to-[#b658f0] text-[11px] font-extrabold text-white">
        Book Workshop
      </div>
      <div className="flex h-11 items-center justify-center rounded border-2 border-[#9367ef] bg-white text-[11px] font-extrabold text-navy">
        Book Workshop
      </div>
    </div>
  );
}

function PriceTile() {
  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      <div className="rounded bg-white p-3 shadow-soft">
        <div className="h-2 w-10 rounded bg-[#cbbdff]" />
        <div className="mt-4 text-sm font-extrabold text-[#3867ff]">INR 24k</div>
        <div className="mt-2 h-1.5 rounded bg-mist-200" />
        <div className="mt-2 h-1.5 w-2/3 rounded bg-mist-200" />
      </div>
      <div className="rounded bg-white p-3 shadow-soft">
        <div className="text-[9px] font-bold text-navy">Team Plan</div>
        <div className="mt-3 text-lg font-extrabold text-navy">Team</div>
        <div className="mt-2 h-3 rounded bg-[#9b5cf2]" />
        <div className="mt-4 flex gap-0.5 text-[#ffb22e]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="h-2.5 w-2.5 fill-current" />
          ))}
        </div>
      </div>
    </div>
  );
}

function ModulesTile() {
  return (
    <div className="relative flex h-full items-center justify-center p-5">
      <div className="absolute left-5 top-7 h-9 w-14 rounded-full border border-dashed border-[#9ce8d4]" />
      <p className="font-display text-3xl font-extrabold leading-tight text-[#a9ffe3]">
        50+
        <span className="block">Modules</span>
        <span className="block">Available.</span>
      </p>
    </div>
  );
}

function NewsTile() {
  return (
    <div className="p-4">
      <div className="rounded bg-[#315eff] p-4 text-white">
        <div className="text-[9px] font-extrabold">Microsoft Updates</div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-9 rounded bg-white" />
          ))}
        </div>
        <div className="mx-auto mt-3 h-2 w-20 rounded bg-white/80" />
      </div>
    </div>
  );
}

function PersonTile() {
  return (
    <div className="flex items-center gap-4 p-4">
      <div className="h-24 w-20 rounded bg-[linear-gradient(180deg,#ffe0d2,#ed5a60)]" />
      <div className="flex-1">
        <div className="h-3 w-20 rounded bg-white/70" />
        <div className="mt-4 h-2 rounded bg-white/70" />
        <div className="mt-2 h-2 w-2/3 rounded bg-white/70" />
        <div className="mt-4 h-5 w-20 rounded bg-white text-[8px] font-bold text-brand" />
      </div>
    </div>
  );
}

function StatsTile() {
  return (
    <div className="grid grid-cols-2 items-center gap-2 p-5">
      <div className="flex h-20 items-center justify-center rounded bg-white shadow-soft">
        <div className="grid h-14 w-14 place-items-center rounded-full border-4 border-[#315eff] text-[10px] font-extrabold text-navy">
          80%
        </div>
      </div>
      <div className="rounded bg-white p-4 text-center shadow-lifted">
        <div className="mx-auto h-6 w-6 rounded bg-[#f5e9ff]" />
        <div className="mt-2 text-base font-extrabold text-navy">800+</div>
        <div className="text-[8px] font-bold text-navy-400">Workshops & Labs</div>
      </div>
    </div>
  );
}

function TestimonialTile() {
  return (
    <div className="p-4">
      <div className="ml-auto rounded bg-[#8f51ea] p-4 text-white shadow-lifted">
        <div className="text-[9px] font-extrabold">Reviews</div>
        <div className="mt-2 h-2 rounded bg-white/50" />
        <div className="mt-2 h-2 w-3/4 rounded bg-white/50" />
      </div>
      <div className="-mt-3 rounded bg-white p-3 shadow-soft">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-[#ffd4c4]" />
          <div className="h-2 flex-1 rounded bg-mist-200" />
        </div>
        <div className="mt-3 flex gap-0.5 text-[#ffb22e]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="h-2.5 w-2.5 fill-current" />
          ))}
        </div>
      </div>
    </div>
  );
}

function CourseTile() {
  return (
    <div className="grid grid-cols-[0.8fr_1fr] gap-3 p-4">
      <div className="space-y-2 rounded bg-white p-3 shadow-soft">
        <div className="h-5 rounded bg-[#ffe2ef]" />
        <div className="h-10 rounded bg-[#d7f0ff]" />
        <div className="h-5 rounded bg-[#eee2ff]" />
      </div>
      <div className="rounded bg-white p-3 shadow-lifted">
        <div className="h-14 rounded bg-[linear-gradient(135deg,#aee4ff,#4e68ff)]" />
        <div className="mt-3 h-2 rounded bg-mist-200" />
        <div className="mt-2 h-2 w-3/4 rounded bg-mist-200" />
      </div>
    </div>
  );
}

function BannerTile() {
  return (
    <div className="space-y-3 p-5">
      <div className="h-9 rounded bg-[linear-gradient(135deg,#2b354d,#7785f8)]" />
      <div className="h-9 rounded bg-[linear-gradient(135deg,#3b2b1f,#ae834d)]" />
    </div>
  );
}

function VideoTile() {
  return (
    <div className="p-4">
      <div className="rounded bg-white p-3 text-navy shadow-soft">
        <div className="grid grid-cols-[1fr_0.9fr] gap-3">
          <div>
            <div className="text-[9px] font-extrabold">Corporate Microsoft Training</div>
            <div className="mt-3 h-2 rounded bg-mist-200" />
            <div className="mt-2 h-2 w-2/3 rounded bg-mist-200" />
            <div className="mt-3 h-4 w-12 rounded bg-[#315eff]" />
          </div>
          <div className="grid place-items-center rounded bg-[#f0334d]">
            <div className="h-7 w-7 rounded-full bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryTile() {
  return (
    <div className="grid grid-cols-4 gap-1 p-4">
      {Array.from({ length: 16 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-7 rounded",
            index % 4 === 0
              ? "bg-[#ffd4c4]"
              : index % 3 === 0
                ? "bg-[#2e58db]"
                : "bg-mist-200"
          )}
        />
      ))}
    </div>
  );
}

function ProgressTile() {
  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      <div className="space-y-2 rounded bg-white p-3 text-[8px] font-bold text-navy shadow-soft">
        <div className="h-3 rounded bg-[#ffe6f0]" />
        <div className="h-3 rounded bg-[#e4f6ff]" />
        <div className="h-3 rounded bg-[#fff4ce]" />
        <div className="h-3 rounded bg-[#ecedff]" />
      </div>
      <div className="flex items-center justify-center rounded bg-white shadow-lifted">
        <div className="grid h-16 w-16 place-items-center rounded-full border-4 border-[#315eff] text-xs font-extrabold text-navy">
          80%
        </div>
      </div>
    </div>
  );
}

function FaqTile() {
  return (
    <div className="grid grid-cols-[1fr_0.45fr] gap-3 p-4">
      <div className="rounded bg-white p-3 shadow-soft">
        <div className="text-[9px] font-extrabold text-navy">Need Microsoft training for your team?</div>
        <div className="mt-3 space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-2 rounded bg-mist-200" />
          ))}
        </div>
      </div>
      <div className="rounded bg-[#ffd7c8]" />
    </div>
  );
}

function MedicalTile() {
  return (
    <div className="p-4">
      <div className="rounded bg-white p-3 shadow-soft">
        <div className="flex justify-between gap-3">
          <div>
            <div className="text-[9px] font-extrabold text-navy">Skill Review</div>
            <div className="mt-3 h-2 w-20 rounded bg-mist-200" />
            <div className="mt-2 h-2 w-14 rounded bg-mist-200" />
          </div>
          <div className="h-12 w-16 rounded bg-[#ffe0ef]" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="h-8 rounded bg-[#315eff]" />
          <div className="h-8 rounded bg-[#f3f6fb]" />
        </div>
      </div>
    </div>
  );
}

function JoinTile() {
  return (
    <div className="p-4">
      <div className="rounded bg-white p-4 shadow-soft">
        <div className="flex gap-0.5 text-[#ff9d27]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="h-2.5 w-2.5 fill-current" />
          ))}
        </div>
        <div className="mt-3 flex -space-x-2">
          {["#ffd4c4", "#ffe7a9", "#d8eeff"].map((color) => (
            <span
              key={color}
              className="h-8 w-8 rounded-full border-2 border-white"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="mt-3 h-2 rounded bg-mist-200" />
        <div className="mt-2 h-2 w-2/3 rounded bg-mist-200" />
      </div>
    </div>
  );
}

const tileContent = [
  <MiniButtonTile key="buttons" />,
  <PriceTile key="price" />,
  <ModulesTile key="elements" />,
  <NewsTile key="news" />,
  <PersonTile key="person" />,
  <StatsTile key="stats" />,
  <TestimonialTile key="testimonial" />,
  <CourseTile key="course" />,
  <CourseTile key="course-alt" />,
  <BannerTile key="banner" />,
  <VideoTile key="video" />,
  <GalleryTile key="gallery" />,
  <ProgressTile key="progress" />,
  <FaqTile key="faq" />,
  <MedicalTile key="medical" />,
  <JoinTile key="join" />,
];

export function LayoutToolkit() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1768px] px-4 sm:px-6">
        <div className="overflow-hidden rounded-lg bg-mist-50 px-5 py-12 sm:px-8 md:px-12 lg:px-16 lg:py-20">
          <div className="mx-auto grid max-w-[1420px] gap-12 lg:grid-cols-[0.46fr_0.54fr] lg:items-center xl:gap-16">
            <div>
              <span className="inline-flex min-h-11 items-center rounded-full bg-brand-50 px-7 text-sm font-extrabold uppercase text-brand sm:text-base">
                Microsoft Services Training
              </span>

              <h2 className="mt-7 max-w-[480px] heading-section text-navy">
                Train Teams Across Microsoft Cloud.
              </h2>

              <div className="mt-10 space-y-5">
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.label}
                      className="relative flex min-h-[88px] items-center rounded-lg bg-white/55 text-navy"
                    >
                      <div
                        className={cn(
                          "flex min-h-[88px] w-full items-center gap-5 rounded-lg px-7 transition-colors sm:gap-6",
                          feature.active && "max-w-[260px] bg-brand-50"
                        )}
                      >
                        <Icon className="h-8 w-8 shrink-0 stroke-[1.7]" />
                        <span className="text-lg font-bold leading-tight sm:text-xl">
                          {feature.label}
                        </span>
                      </div>
                      {feature.active && (
                        <span className="absolute right-[-15px] top-1/2 hidden h-8 w-8 -translate-y-1/2 rotate-45 bg-white/55 md:block" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-6 left-[8%] hidden w-[78%] rounded-[48px] bg-[#c6b7f4]/55 blur-sm lg:block" />
              <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6">
                {tileContent.map((content, index) => (
                  <div
                    key={index}
                    className={cn(
                      "min-h-[112px] overflow-hidden rounded-lg border border-dashed border-[#c8badf] shadow-[0_18px_38px_rgba(83,67,151,0.08)]",
                      tileStyles[index]
                    )}
                  >
                    {content}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

