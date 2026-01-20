"use client";

import { useEffect } from "react";

export default function UnicornTest() {
  useEffect(() => {
    // @ts-expect-error - UnicornStudio is loaded from external script
    if (!window.UnicornStudio) {
      // @ts-expect-error - UnicornStudio is loaded from external script
      window.UnicornStudio = { isInitialized: false };
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.1/dist/unicornStudio.umd.js";
      script.onload = () => {
        // @ts-expect-error - UnicornStudio is loaded from external script
        if (!window.UnicornStudio.isInitialized) {
          // @ts-expect-error - UnicornStudio is loaded from external script
          UnicornStudio.init();
          // @ts-expect-error - UnicornStudio is loaded from external script
          window.UnicornStudio.isInitialized = true;
        }
      };
      (document.head || document.body).appendChild(script);
    } else {
      // @ts-expect-error - UnicornStudio is loaded from external script
      if (!window.UnicornStudio.isInitialized) {
        // @ts-expect-error - UnicornStudio is loaded from external script
        UnicornStudio.init();
        // @ts-expect-error - UnicornStudio is loaded from external script
        window.UnicornStudio.isInitialized = true;
      }
    }
  }, []);

  return (
    <div className="w-screen h-screen bg-black">
      <div
        data-us-project="a0oaUSHNZqtDfeVeK1vr"
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
