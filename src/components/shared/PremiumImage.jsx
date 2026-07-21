import React from "react";

// Premium image styling — minimal controlled zoom (scale-[1.03]) with object-cover to hide edge camera watermarks while keeping the composition beautifully framed.
export default function PremiumImage({ src, alt, containerClassName = "", imgClassName = "" }) {
  return (
    <div className={`rounded-2xl shadow-xl border border-emerald-950/10 overflow-hidden ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover object-center scale-[1.03] filter contrast-[1.02] saturate-[1.03] brightness-[0.98] ${imgClassName}`}
      />
    </div>
  );
}