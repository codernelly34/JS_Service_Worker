if ("serviceWorker" in navigator) {
   window.addEventListener("load", () => {
      navigator.serviceWorker
         .register("/service_worker.js")
         .then((registration) => {
            console.log(
               "Service Worker registered successfully:",
               registration
            );
         })
         .catch((error) => {
            console.log("Service Worker registration failed:", error);
         });
   });
}
