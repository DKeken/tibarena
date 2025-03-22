import { useEffect, useState } from "react";

/**
 * A hook that executes a callback function when the component is mounted.
 * Useful for avoiding hydration issues with server-side rendering.
 *
 * @param {Function} callback - Function to execute after component is mounted
 * @returns {boolean} Whether the component is mounted
 */
export function useMount(callback?: () => void): boolean {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (callback) {
      callback();
    }
    // Don't set isMounted to false in cleanup function
    // This was causing "Maximum update depth exceeded" error
  }, []); // Remove callback from dependency array to prevent re-execution

  return isMounted;
}
