import React, { useState } from "react";

export default function PlacementForm({ onSubmit, isLoading }) {
  const [indexNumber, setIndexNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const cleaned = indexNumber.trim();
    if (!/^\d{10}$/.test(cleaned)) {
      setError("Please enter a valid 10-digit CSSPS Index Number.");
      return;
    }
    onSubmit(cleaned);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-heritage-slate mb-2">
          CSSPS Index Number
        </label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={10}
          value={indexNumber}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "");
            setIndexNumber(v);
            if (error) setError("");
          }}
          placeholder="Enter your 10-digit index number"
          className="w-full px-4 py-3.5 bg-white border-2 border-heritage-green/20 rounded-lg text-lg font-mono tracking-widest text-center focus:outline-none focus:border-heritage-gold focus:ring-2 focus:ring-heritage-gold/20 transition-all"
          autoFocus
        />
        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </p>
        )}
        <p className="mt-2 text-xs text-heritage-slate/50">
          Your index number was provided by CSSPS. It should be exactly 10 digits.
        </p>
      </div>
      <button
        type="submit"
        disabled={isLoading || indexNumber.length !== 10}
        className="w-full py-3.5 bg-heritage-green text-heritage-cream font-semibold rounded-lg hover:bg-heritage-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-heritage-cream/30 border-t-heritage-cream rounded-full animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            Check My Placement
          </>
        )}
      </button>
    </form>
  );
}