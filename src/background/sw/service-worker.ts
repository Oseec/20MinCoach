/* /// <reference lib="webworker" />
self.addEventListener("push", (event: any) => {
  const data = event.data?.json?.() || { title: "20minCoach", body: "Update" };
  event.waitUntil(
    (self as any).registration.showNotification(data.title, {
      body: data.body, icon: "/icons/icon-192.png",
    })
  );
});
 */