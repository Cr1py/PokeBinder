"use client";

type PageCornerProps = {
  position: "top-left" | "bottom-left" | "top-right" | "bottom-right";
  onClick: () => void;
  disabled: boolean;
};

const clipPaths: Record<PageCornerProps["position"], string> = {
  "top-left": "polygon(0 0, 100% 0, 0 100%)",
  "top-right": "polygon(100% 0, 100% 100%, 0 0)",
  "bottom-left": "polygon(0 0, 0 100%, 100% 100%)",
  "bottom-right": "polygon(100% 0, 100% 100%, 0 100%)",
};

const positionClasses: Record<PageCornerProps["position"], string> = {
  "top-left": "left-0 top-0",
  "top-right": "right-0 top-0",
  "bottom-left": "left-0 bottom-0",
  "bottom-right": "right-0 bottom-0",
};

export default function PageCorner({ position, onClick, disabled }: PageCornerProps) {
  if (disabled) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={position.includes("left") ? "Previous page" : "Next page"}
      className={`group absolute z-20 h-32 w-32 cursor-pointer ${positionClasses[position]}`}
      style={{ clipPath: clipPaths[position] }}
    >
      <span className="absolute inset-0 rounded bg-gradient-to-br from-white/0 to-white/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      {/* todo: figure out how to make the highlight flush against the page */}
    </button>
  );
}