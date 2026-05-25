"use client";

import { useEffect, useMemo, useState } from "react";

type OrderingBannerProps = {
  sundayLabel: string;
  cutoffLabel: string;
  cutoffIso?: string;
  open: boolean;
  reason: string;
  overrideClosed: boolean;
  overrideMessage?: string;
};

function formatRemaining(ms: number) {
  const totalMinutes = Math.max(0, Math.floor(ms / 60000));
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function OrderingBanner({
  sundayLabel,
  cutoffLabel,
  cutoffIso,
  open,
  reason,
  overrideClosed,
  overrideMessage,
}: OrderingBannerProps) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 60000);
    return () => window.clearInterval(interval);
  }, []);

  const cutoffMs = cutoffIso ? new Date(cutoffIso).getTime() : null;
  const remainingMs = cutoffMs ? cutoffMs - now : null;
  const showCountdown = open && remainingMs !== null && remainingMs > 0 && remainingMs <= 48 * 60 * 60 * 1000;

  const message = useMemo(() => {
    if (overrideClosed) {
      return overrideMessage || "Ordering is paused this week. Check back Monday for the next menu.";
    }

    if (!open) {
      return `${reason} The next menu reopens Monday.`;
    }

    if (showCountdown && remainingMs !== null) {
      return `Closing soon: reservations for ${sundayLabel} close in ${formatRemaining(remainingMs)}.`;
    }

    return `Reservations for ${sundayLabel} close ${cutoffLabel}, or whenever we sell out.`;
  }, [cutoffLabel, open, overrideClosed, overrideMessage, reason, remainingMs, showCountdown, sundayLabel]);

  return (
    <div className={`saturday-banner ${showCountdown ? "closing-soon" : ""} ${!open || overrideClosed ? "closed" : ""}`}>
      <span className="sb-dot" />
      <span>{message}</span>
    </div>
  );
}
