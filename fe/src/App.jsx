// App.js
import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { NotificationProvider } from "./context/NotificationContext";
import { Toaster } from "react-hot-toast"; // Consider adding for notifications

function App() {
  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <AppRoutes />
        {/* Add toast component for user feedback */}
        {/* <Toaster position="top-right" /> */}
      </div>
    </NotificationProvider>
  );
}

export default App;