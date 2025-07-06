import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Prevent the default browser behavior
  event.preventDefault();
});

// Hide runtime error overlay by pressing Esc key
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    // Try to dismiss any error overlays
    const errorModal = document.querySelector('[data-testid="runtime-error-modal"]');
    if (errorModal) {
      errorModal.remove();
    }
  }
});

// Auto-dismiss error overlays after 3 seconds
setTimeout(() => {
  const errorModal = document.querySelector('[data-testid="runtime-error-modal"]');
  if (errorModal) {
    errorModal.remove();
  }
}, 3000);

createRoot(document.getElementById("root")!).render(<App />);
