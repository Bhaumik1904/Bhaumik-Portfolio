// Lightweight event-based toast — no Context needed
// Usage: import toast from '../utils/toast'; toast.success('Done!');

const dispatch = (type, message) => {
  window.dispatchEvent(new CustomEvent('portfolio-toast', { detail: { type, message } }));
};

const toast = {
  success: (message) => dispatch('success', message),
  info:    (message) => dispatch('info',    message),
  error:   (message) => dispatch('error',   message),
};

export default toast;
