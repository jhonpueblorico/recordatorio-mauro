importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCnt-WgeJL9po_2UvwYZ94m9kIySjL2jm4",
  authDomain: "recordatorio-mauro.firebaseapp.com",
  projectId: "recordatorio-mauro",
  storageBucket: "recordatorio-mauro.appspot.com",
  messagingSenderId: "178317275132",
  appId: "1:178317275132:web:3c228cd26effa1f0064c79"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png" // Podés cambiar esto si querés otro ícono
  });
});
