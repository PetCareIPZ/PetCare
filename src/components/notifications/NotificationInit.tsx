"use client";

import { useEffect } from "react";
import { urlBase64ToUint8Array } from "~/lib/vapid";
import type { userDev } from "~/types/userDev";

export function NotificationInitializer({userDevData} :{userDevData : userDev}): null {
  
  useEffect(() => {
    const init = async (): Promise<void> => {
      try {
        await fetch("/api/notifications/init", { method: "POST" });

        if (!("Notification" in window)) return;
        if (!("serviceWorker" in navigator)) return;

        if (Notification.permission === "denied") return;

        if (Notification.permission === "default") {
          const permission = await Notification.requestPermission();

          if (permission !== "granted") return;
        }

        const registration = await navigator.serviceWorker.register("/sw.js");

        const existing = await registration.pushManager.getSubscription();

        if (existing) return;

        const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ) as BufferSource
        });
        const payload = {
          userDevData,
          subscription
        }
        await fetch("/api/push/subscribe", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json"
          }
        });
      } catch (error) {
        console.error("Push initialization failed", error);
      }
    };

    void init();
  }, []);

  return null;
}