"use client";
import { useState, useEffect } from "react";

type DateTime = {
  date: string;
  time: string;
};

export default function useDate(): DateTime {
  const [dateTime, setDateTime] = useState<DateTime>({
    date: "",
    time: ""
  });

  useEffect(() => {
    const locale: string = navigator.language || "en-US";

    const update = () => {
      const now = new Date();

      setDateTime({
        date: now.toLocaleDateString(locale, {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        time: now.toLocaleTimeString(locale, {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    };

    update();
    const interval: ReturnType<typeof setInterval> = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return dateTime;
}

