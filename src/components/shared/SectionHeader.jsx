import React from "react";

export default function SectionHeader({ title, subtitle, centered = true, light = false }) {
  return (
    <div className={`mb-8 md:mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className={`font-heading text-3xl md:text-4xl font-semibold ${light ? "text-heritage-cream" : "text-heritage-slate"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base md:text-lg max-w-2xl leading-relaxed ${centered ? "mx-auto" : ""} ${light ? "text-heritage-cream/70" : "text-heritage-slate/60"}`}>
          {subtitle}
        </p>
      )}
      <div className="golden-thread max-w-24 mx-auto mt-5" />
    </div>
  );
}