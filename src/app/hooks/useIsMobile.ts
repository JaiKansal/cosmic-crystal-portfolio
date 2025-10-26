// app/hooks/useIsMobile.ts
"use client"; // This hook only runs on the client

import { useState, useEffect } from 'react';

// We'll set the mobile breakpoint to 768px (standard for tablets)
export function useIsMobile(breakpoint: number = 768): boolean {
  // Default to false (desktop)
  // This will be the value on the server and the initial client render
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    // This effect only runs on the client, where 'window' exists.
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }

    // Set the initial state on the client as soon as it loads
    handleResize();

    // Add event listener for window resizes
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]); // Only re-run the effect if the breakpoint prop changes

  return isMobile;
}