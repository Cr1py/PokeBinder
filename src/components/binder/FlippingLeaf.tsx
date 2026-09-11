"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import PageContent from "./PageContent";

type FlippingLeafProps = {
  direction: 1 | -1; // 1 = turning forward, -1 = turning back
  frontPageNum: number | null;
  backPageNum: number | null;
  onComplete: () => void;
};

export default function FlippingLeaf({
  direction,
  frontPageNum,
  backPageNum,
  onComplete,
}: FlippingLeafProps) {
  const rotateY = useMotionValue(0);
  const isForward = direction === 1;

  useEffect(() => {
    const controls = animate(rotateY, isForward ? -180 : 180, {
      duration: 0.9,
      ease: [0.45, 0, 0.55, 1],
      onComplete,
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const frontShadow = useTransform(rotateY, (v) => {
    const abs = Math.min(Math.abs(v), 90);
    return (abs / 90) * 0.55;
  });
  const backShadow = useTransform(rotateY, (v) => {
    const abs = Math.min(Math.abs(v), 180);
    const past = Math.max(abs - 90, 0);
    return 0.55 - (past / 90) * 0.55;
  });

  const frontPad = isForward ? "py-8 pl-4 pr-8" : "py-8 pl-8 pr-4";
  const backPad = isForward ? "py-8 pl-8 pr-4" : "py-8 pl-4 pr-8";

  return (
    <motion.div
      className="absolute top-0 h-full w-1/2"
      style={
        isForward
          ? {
              left: "50%",
              rotateY,
              transformStyle: "preserve-3d",
              transformOrigin: "0% 50%",
              zIndex: 30,
            }
          : {
              right: "50%",
              rotateY,
              transformStyle: "preserve-3d",
              transformOrigin: "100% 50%",
              zIndex: 30,
            }
      }
    >
      {/* front */}
      <div
        className={`absolute inset-0 rounded-2xl bg-grey-darker shadow-xl ${frontPad}`}
        style={{ backfaceVisibility: "hidden" }}
      >
        <PageContent pageNum={frontPageNum} />
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl bg-black"
          style={{ opacity: frontShadow }}
        />
      </div>

      {/* back  */}
      <div
        className={`absolute inset-0 rounded-2xl bg-grey-darker shadow-xl ${backPad}`}
        style={{
          backfaceVisibility: "hidden",
          transform: isForward ? "rotateY(180deg)" : "rotateY(-180deg)",
        }}
      >
        <PageContent pageNum={backPageNum} />
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl bg-black"
          style={{ opacity: backShadow }}
        />
      </div>
    </motion.div>
  );
}