"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Star } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white pt-[122px]">
      <div className="relative mx-auto min-h-[560px] w-full overflow-hidden bg-[linear-gradient(105deg,#f8eeee_0%,#fffaf5_48%,#e6f7f2_100%)] px-5 py-8 sm:px-8 md:px-12 lg:min-h-[595px] lg:px-16 xl:min-h-[625px]">
        <motion.div
          animate={{ scale: [1, 1.04, 1], x: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-20 -top-32 h-[390px] w-[390px] rounded-full bg-[#eadfdf]/45"
        />
        <motion.div
          animate={{ scale: [1, 0.96, 1], y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-20 top-24 h-[210px] w-[210px] rounded-full bg-[#f0e7e7]/55"
        />
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-28, -18, -28] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-7 top-[35%] h-12 w-8 rounded-full bg-[#0879ff]"
        />
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [135, 148, 135] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-[45%] top-[25%] h-12 w-8 rounded-full bg-[#0dd34d]"
        />
        <motion.div
          animate={{ x: [0, 12, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute bottom-[28%] right-10 h-5 w-8 rounded-full bg-[#ffb52d]"
        />

        <div className="mx-auto grid max-w-[1620px] grid-cols-1 items-center gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.12, delayChildren: 0.08 }}
            className="relative z-20 max-w-[600px] py-4 lg:py-9 xl:pl-8"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex h-10 items-center gap-2.5 rounded-full border border-[#5746ff] px-4 text-sm font-bold text-[#5746ff] sm:text-base"
            >
              <GraduationCap className="h-5 w-5" />
              <span>Corporate Microsoft Training</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 text-[2.35rem] font-extrabold leading-[1.12] text-[#242424] sm:text-[2.85rem] lg:text-[3.05rem] xl:text-[3.25rem]"
            >
              <span className="block lg:whitespace-nowrap">
                Microsoft Services
              </span>
              <span className="block">Training</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-[560px] text-base font-medium leading-7 text-[#5f5f5f] sm:text-[17px]"
            >
              We provide hands-on corporate training for Microsoft Dynamics 365,
              Azure, Power Platform, Copilot, AI, data, and enterprise cloud
              services.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              <Link
                href="/courses"
                className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#5638ff] px-7 text-base font-extrabold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#4326ec]"
              >
                Explore Training
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="flex items-center gap-4">
                <Image
                  src="/images/MicrosoftLogo.png"
                  alt="Microsoft"
                  width={190}
                  height={42}
                  className="h-7 w-auto object-contain"
                />
                <div className="flex items-center gap-2 text-base font-semibold text-[#555]">
                  <Star className="h-5 w-5 fill-[#ff9f10] text-[#ff9f10]" />
                  <span>Corporate Ready</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="relative z-10 min-h-[470px] lg:min-h-[590px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.84, x: "-50%", y: "-50%" }}
              animate={{
                opacity: 1,
                scale: [1, 1.025, 1],
                x: "-50%",
                y: "-50%",
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.2 },
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute left-[56%] top-[51%] z-0 h-[340px] w-[340px] rounded-full bg-[#ffdfe0]/55 ring-[20px] ring-[#ffc7cb]/45 sm:h-[410px] sm:w-[410px] lg:h-[500px] lg:w-[500px] xl:h-[550px] xl:w-[550px]"
            />

            <motion.div
              initial={{ opacity: 0, x: "-46%", y: 28, scale: 0.96 }}
              animate={{
                opacity: 1,
                x: "-50%",
                y: [0, -8, 0],
                scale: 1,
              }}
              transition={{
                opacity: { duration: 0.7, delay: 0.28 },
                x: { duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute bottom-0 left-[56%] z-10 h-[480px] w-[108%] max-w-[930px] sm:h-[545px] lg:bottom-0 lg:h-[620px] xl:h-[660px] xl:max-w-[1000px]"
            >
              <Image
                src="/images/Microsoft%20Ecosytem.png"
                alt="Microsoft ecosystem"
                fill
                priority
                sizes="(min-width: 1280px) 1000px, (min-width: 1024px) 60vw, 104vw"
                className="object-contain object-center"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: [0, -7, 0], scale: 1 }}
              transition={{
                opacity: { duration: 0.55, delay: 0.55 },
                scale: { duration: 0.55, delay: 0.55, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute bottom-8 left-4 z-30 flex w-[230px] items-center gap-3.5 rounded-lg border border-black/5 bg-white/95 px-4 py-3.5 shadow-[0_14px_38px_rgba(16,24,40,0.1)] backdrop-blur sm:left-8 lg:left-2 xl:left-4"
            >
              <GraduationCap className="h-9 w-9 shrink-0 text-[#5746ff]" />
              <div>
                <strong className="block text-2xl font-extrabold text-[#5746ff]">
                  250+
                </strong>
                <span className="mt-1 block text-sm font-medium text-[#606060]">
                  Professionals Trained
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
