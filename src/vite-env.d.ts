/// <reference types="vite/client" />

// Cal.com embed types
declare global {
  interface Window {
    Cal?: (action: string) => void;
  }
}

export {};