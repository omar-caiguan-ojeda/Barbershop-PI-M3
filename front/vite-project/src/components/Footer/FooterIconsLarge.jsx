// Versiones grandes y llamativas de los iconos para la sección de contacto
export function FacebookIconLarge({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#1877F3" />
      <path d="M18.67 16.001h2.053l.323-2.507h-2.376v-1.24c0-.724.237-1.368.92-1.368h1.485V8.82S19.77 8.667 18.91 8.667c-2.01 0-2.68 1.19-2.68 3.193v1.634h-1.35v2.507h1.35v6.06h2.68v-6.06z" fill="#fff" />
    </svg>
  );
}

export function InstagramIconLarge({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <radialGradient id="igpaint0_radial_l" cx="0" cy="0" r="1" gradientTransform="translate(16 16) scale(16)" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFD676"/>
        <stop offset="0.5" stopColor="#FCA7B6"/>
        <stop offset="1" stopColor="#A069E7"/>
      </radialGradient>
      <rect x="4" y="4" width="24" height="24" rx="8" fill="url(#igpaint0_radial_l)"/>
      <circle cx="16" cy="16" r="6" fill="#fff"/>
      <circle cx="16" cy="16" r="4" fill="#A069E7"/>
      <circle cx="22.5" cy="9.5" r="1.5" fill="#fff"/>
    </svg>
  );
}

export function TikTokIconLarge({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#000" />
      <path d="M21.5 13.5c-1.1 0-2-.9-2-2V9h-2.2v9.5a2.5 2.5 0 11-2-2.45V13a4.5 4.5 0 104.5 4.5V13.5h1.7z" fill="#fff"/>
      <path d="M21.5 13.5c-1.1 0-2-.9-2-2V9h-2.2v9.5a2.5 2.5 0 11-2-2.45V13a4.5 4.5 0 104.5 4.5V13.5h1.7z" fill="#25F4EE" fillOpacity=".6"/>
      <path d="M21.5 13.5c-1.1 0-2-.9-2-2V9h-2.2v9.5a2.5 2.5 0 11-2-2.45V13a4.5 4.5 0 104.5 4.5V13.5h1.7z" fill="#FE2C55" fillOpacity=".4"/>
    </svg>
  );
}

export function WhatsAppIconLarge({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#25D366"/>
      <path d="M23.3 20.7c-.3-.2-1.7-.8-2-1s-.5-.1-.7.1c-.2.2-.7 1-1 1.2-.2.2-.4.2-.7.1-2-.8-3.3-2.7-3.4-2.8-.2-.2-.2-.5 0-.7.2-.2.4-.5.5-.7.1-.2.1-.3 0-.5s-.7-1.7-1-2.3c-.3-.6-.6-.5-.8-.6s-.4-.1-.6 0c-.2.1-.6.2-.9.5-.3.3-1.2 1.2-1.2 2.9 0 1.7 1.2 3.3 1.4 3.5.2.2 2.3 3.6 5.8 3.6 1.6 0 2.7-.6 3.1-1.1.4-.5 1.2-1.2 1.2-2.3 0-.2-.1-.3-.3-.4z" fill="#fff"/>
    </svg>
  );
}
