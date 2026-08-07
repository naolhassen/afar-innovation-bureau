type IconProps = { size?: number; className?: string };

export function FacebookIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.83c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

export function TelegramIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21.94 4.4 2.7 11.9c-1.2.47-1.19 1.13-.22 1.42l4.9 1.53 1.9 5.85c.24.62.42.86.85.86.34 0 .5-.15.7-.35l1.9-1.85 4.1 3.03c.83.55 1.4.26 1.62-.75L22.7 5.4c.32-1.24-.42-1.63-1.7-1z" />
    </svg>
  );
}

export function XIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.24 2H21l-6.55 7.49L22.5 22h-6.9l-5.4-7.06L4.06 22H1.28l7.03-8.03L1 2h6.98l4.9 6.48L18.24 2Zm-2.4 18h1.9L8.24 4H6.2l9.64 16Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.42.47.65.25 1.2.6 1.72 1.12.52.52.87 1.07 1.12 1.72.25.63.42 1.36.47 2.42.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.42a4.6 4.6 0 0 1-1.12 1.72 4.6 4.6 0 0 1-1.72 1.12c-.63.25-1.36.42-2.42.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.42-.47a4.6 4.6 0 0 1-1.72-1.12 4.6 4.6 0 0 1-1.12-1.72c-.25-.63-.42-1.36-.47-2.42C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.42.25-.65.6-1.2 1.12-1.72A4.6 4.6 0 0 1 5.37.53C6-.72 6.73-.9 7.79-.94 8.85-.99 9.19-1 12-1Zm0 3.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4Zm0 2a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4Zm6.4-3.6a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8Z" />
    </svg>
  );
}

export function YoutubeIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.5 6.2s-.23-1.64-.94-2.36c-.9-.94-1.9-.95-2.36-1C16.9 2.5 12 2.5 12 2.5h-.01s-4.9 0-8.2.34c-.46.05-1.46.06-2.36 1C.72 4.56.5 6.2.5 6.2S.25 8.13.25 10.06v1.87c0 1.93.25 3.86.25 3.86s.23 1.64.93 2.36c.9.95 2.08.92 2.6 1.02C5.9 19.5 12 19.55 12 19.55s4.9-.01 8.2-.35c.46-.05 1.46-.06 2.36-1 .7-.72.94-2.36.94-2.36s.25-1.93.25-3.86v-1.87c0-1.93-.25-3.86-.25-3.86ZM9.7 14.3V7.8l6.4 3.25-6.4 3.25Z" />
    </svg>
  );
}
