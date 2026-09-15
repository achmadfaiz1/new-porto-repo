import { useEffect, useState } from "react";

function formatJakarta(now: Date) {
  const date = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(now);

  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  return { date, time };
}

export function JakartaClock() {
  const [clock, setClock] = useState(() => formatJakarta(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => {
      setClock(formatJakarta(new Date()));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="font-mono text-xs tracking-wide text-ash"
      aria-live="polite"
      title="Asia/Jakarta (WIB)"
    >
      <span className="text-mist">JKT</span>{" "}
      <span className="text-ink">{clock.time}</span>
      <span className="mx-1.5 text-line">·</span>
      <span>{clock.date}</span>
      <span className="ml-1.5 text-mist">WIB</span>
    </div>
  );
}
