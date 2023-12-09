// this file must be in root folder
importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCtUR33LhLprgeamwKyQQ8ST5avWagHfbQ",
  authDomain: "test2-project-e1e53.firebaseapp.com",
  projectId: "test2-project-e1e53",
  storageBucket: "test2-project-e1e53.appspot.com",
  messagingSenderId: "589308102792",
  appId: "1:589308102792:web:509d30fa2949cfb314f73d",
};

// receiving messages in background
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// get this type of message in background
messaging.onBackgroundMessage(function (payload) {
  if (!payload.hasOwnProperty("notification")) {
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: payload.data.icon,
      image: payload.data.image,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
    self.addEventListener("notificationclick", function (event) {
      const clickedNotification = event.notification;
      clickedNotification.close();
      event.waitUntil(clients.openWindow(payload.data.click_action));
    });
  }
});
