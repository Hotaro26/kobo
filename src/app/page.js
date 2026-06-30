'use client';

import { useState, useEffect, useRef } from 'react';

// Brand SVG map with official brand hex colors
const BRAND_ICONS = {
  youtube: (color = '#FF0000') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  instagram: (color = '#E1306C') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  ),
  tiktok: (color = '#00f2fe') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.17.94 1.13 2.27 1.9 3.71 2.24v3.96c-1.78-.17-3.47-.95-4.68-2.27v7.41c.02 4.22-3.15 7.82-7.36 8.1-4.72.32-8.72-3.32-8.7-8.04.02-4.23 3.16-7.83 7.37-8.1 1.25-.08 2.5.23 3.56.9v3.97c-.77-.57-1.72-.86-2.68-.82-2.3.1-4.08 2.05-3.98 4.35.1 2.1 1.83 3.76 3.93 3.76 2.03 0 3.67-1.64 3.67-3.67v-13.6c.01-.89 0-1.78.02-2.67z"/>
    </svg>
  ),
  twitter: (color = '#1DA1F2') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  ),
  facebook: (color = '#1877F2') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  reddit: (color = '#FF4500') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.29-1.72l1.35-4.24 3.71.79c.08.97.89 1.73 1.86 1.73 1.02 0 1.86-.84 1.86-1.86s-.84-1.86-1.86-1.86c-.95 0-1.73.72-1.85 1.65l-4.14-.88c-.19-.04-.38.07-.43.27l-1.52 4.79c-2.52.04-4.79.68-6.47 1.72-.56-.76-1.46-1.24-2.42-1.24-1.65 0-3 1.35-3 3 0 1.13.62 2.1 1.54 2.61-.06.29-.09.59-.09.9 0 3.86 4.49 7 10 7s10-3.14 10-7c0-.31-.03-.61-.09-.9.92-.51 1.54-1.48 1.54-2.61zm-18 1c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm11 4.5c-1.82 1.82-5.38 1.82-7.2 0-.19-.19-.19-.51 0-.7.19-.19.51-.19.7 0 1.43 1.43 4.37 1.43 5.8 0 .19-.19.51-.19.7 0 .19.19.19.51 0 .7zm-1.8-3.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
    </svg>
  ),
  soundcloud: (color = '#FF5500') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M1.07 12.01c-.07-.09-.13-.21-.13-.34 0-.14.06-.25.13-.34.08-.09.21-.14.36-.14h.02c.16 0 .29.05.37.14.07.09.11.2.11.34 0 .13-.04.25-.11.34-.08.09-.21.14-.37.14h-.02c-.15 0-.28-.05-.36-.14zm1.46.99c-.09-.12-.15-.28-.15-.47v-1.04c0-.18.06-.35.15-.47.1-.12.24-.18.42-.18h.01c.17 0 .31.06.41.18.09.12.14.29.14.47v1.04c0 .19-.05.35-.14.47-.1-.12-.24-.18-.41-.18h-.01c-.18 0-.32-.06-.42-.18zm1.74.88c-.1-.14-.16-.33-.16-.56v-2.77c0-.23.06-.42.16-.56.1-.14.26-.21.46-.21h.01c.2 0 .36.07.46.21.1.14.15.33.15.56v2.77c0 .23-.05.42-.15.56-.1.14-.26.21-.46.21h-.01c-.2 0-.36-.07-.46-.21zm1.74.07c-.1-.13-.16-.31-.16-.52v-3.73c0-.22.06-.4.16-.53.11-.13.28-.2.49-.2h.01c.21 0 .38.07.49.2.1.13.16.31.16.53v3.73c0 .21-.06.39-.16.52-.11.13-.28.2-.49.2h-.01c-.21 0-.38-.07-.49-.2zm1.73-.24c-.08-.12-.13-.28-.13-.48v-4.14c0-.2.05-.36.13-.48.08-.12.23-.19.43-.19h.01c.19 0 .34.07.42.19.08.12.13.28.13.48v4.14c0 .2-.05.36-.13.48-.08.12-.23.19-.42.19h-.01c-.2 0-.35-.07-.43-.19zm1.75-.49c-.06-.11-.1-.26-.1-.44V7.47c0-.18.04-.33.1-.44.07-.11.2-.17.38-.17h.01c.17 0 .3.06.37.17.07.11.1.26.1.44v4.49c0 .18-.03.33-.1.44-.07.11-.2.17-.37.17h-.01c-.18 0-.31-.06-.38-.17zm1.74-.8c-.04-.1-.06-.23-.06-.39V6.43c0-.17.02-.3.06-.39.05-.1.16-.14.32-.14h.01c.16 0 .26.04.31.14.04.09.07.22.07.39v4.85c0 .16-.03.29-.07.39-.05.1-.15.14-.31.14h-.01c-.16 0-.27-.04-.32-.14zm1.73-1.63c-.02-.07-.03-.17-.03-.3v-5.2c0-.12.01-.22.03-.3.03-.07.11-.11.24-.11.13 0 .21.04.24.11.02.08.03.18.03.3v5.2c0 .13-.01.23-.03.3-.03.07-.11.11-.24.11-.13 0-.21-.04-.24-.11zm1.61 2.37v-6.95c0-.08.01-.15.02-.21.02-.06.07-.09.16-.09s.14.03.16.09c.02.06.02.13.02.21v6.95c0 .08-.01.15-.02.21-.02.06-.07.09-.16.09s-.14-.03-.16-.09c-.02-.06-.02-.13-.02-.21zm1.76-.11V8.65c.34-.69.96-1.12 1.72-1.12.16 0 .32.02.48.07.67.2 1.15.82 1.25 1.58.21-.08.43-.13.66-.13.92 0 1.69.73 1.76 1.71.61-.31 1.34-.23 1.86.25.47.43.7 1.1.6 1.84h3.67c.36 0 .66.3.66.66v1.36c0 .36-.3.66-.66.66H10.15c-.17 0-.31-.05-.41-.17-.09-.12-.14-.29-.14-.47zm6.75-2.28c0-.49-.4-.89-.89-.89-.48 0-.88.39-.89.88v.01c0 .49.4.89.89.89.48 0 .88-.39.89-.88v-.01z"/>
    </svg>
  ),
  pinterest: (color = '#BD081C') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.204 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.621 0 11.988-5.367 11.988-11.987C24 5.368 18.637 0 12.017 0z"/>
    </svg>
  ),
  bilibili: (color = '#00AEEC') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M18.158 2.604a1.042 1.042 0 0 1 1.724.773v1.171h2.243c1.033 0 1.875.842 1.875 1.875v11.75a1.875 1.875 0 0 1-1.875 1.875H1.875A1.875 1.875 0 0 1 0 18.198V6.448c0-1.033.842-1.875 1.875-1.875h2.243V3.402a1.042 1.042 0 0 1 1.724-.773L9.043 5.37h5.914l3.201-2.766zM12 7.698c-3.791 0-6.875 2.239-6.875 5s3.084 5 6.875 5 6.875-2.239 6.875-5-3.084-5-6.875-5zm-3.438 3.125a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm6.875 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"/>
    </svg>
  ),
  twitch: (color = '#9146FF') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
    </svg>
  ),
  vimeo: (color = '#1AB7EA') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M22.396 7.111c-.097 2.062-1.535 4.878-4.317 8.449-2.887 3.737-5.331 5.603-7.325 5.603-1.238 0-2.278-1.14-3.116-3.42-.56-2.05-1.122-4.103-1.683-6.155-.623-2.279-1.288-3.42-1.999-3.42-.156 0-.698.326-1.627.978l-.978-1.254c1.026-.91 2.044-1.821 3.053-2.732 1.399-1.205 2.417-1.841 3.053-1.907 1.5-.162 2.428.86 2.784 3.064.389 2.409.664 3.901.825 4.471.42 1.838.874 2.757 1.357 2.757.362 0 .914-.582 1.66-1.747.744-1.162 1.15-2.042 1.218-2.639.13-1.162-.266-1.747-1.186-1.747-.446 0-.915.104-1.408.312 1.055-3.456 3.063-5.155 6.023-5.097 2.186.045 3.208 1.488 3.066 4.331z"/>
    </svg>
  ),
  vk: (color = '#0077FF') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M22.378 12.012c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10zm-11.47 4.095h-1.077c-2.433 0-4.237-1.802-5.413-4.218l1.493-.012c.799 1.422 2.018 2.275 2.731 2.275.342 0 .49-.251.49-.78v-2.029c0-.853-.186-1.218-.946-1.218-.328 0-.585.048-.797.108.261-.81.986-1.196 2.028-1.196h1.077v3.081c0 .408.187.551.49.551.272 0 .76-.145 1.547-.946l1.246-1.686 1.493-.012c-.22 1.026-1.286 2.378-2.196 3.081.91.809 2.028 2.122 2.502 2.981H14.16c-.502-.853-1.286-1.803-2.018-1.803-.328 0-.491.144-.632.422l-.602 1.382z"/>
    </svg>
  ),
  bluesky: (color = '#0085FF') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 10.8c-1.2-2.4-3.6-6-6-6C3.6 4.8 1.2 7.2 1.2 9.6c0 4.8 4.8 7.2 7.2 9.6-3.6 2.4-7.2 2.4-7.2 2.4h19.6s-3.6 0-7.2-2.4c2.4-2.4 7.2-4.8 7.2-9.6 0-2.4-2.4-4.8-4.8-4.8-2.4 0-4.8 3.6-6 6z"/>
    </svg>
  ),
  dailymotion: (color = '#0066FF') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M19.123 0H4.877C2.183 0 0 2.183 0 4.877v14.246C0 21.817 2.183 24 4.877 24h14.246C21.817 24 24 21.817 24 19.123V4.877C24 2.183 21.817 0 19.123 0zm-5.015 15.342c0 2.158-1.579 3.518-3.738 3.518-2.196 0-3.776-1.36-3.776-3.518V9.162c0-2.158 1.58-3.518 3.776-3.518 2.159 0 3.738 1.36 3.738 3.518v6.18zM12.18 9.162c0-.986-.713-1.636-1.81-1.636-1.096 0-1.81.65-1.81 1.636v6.18c0 .986.714 1.636 1.81 1.636 1.097 0 1.81-.65 1.81-1.636V9.162z"/>
    </svg>
  ),
  loom: (color = '#625DF5') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm3-6c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
    </svg>
  ),
  snapchat: (color = '#FFFC00') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.832 15.633c-.156.444-.333.882-.524 1.314-.066.149-.047.32.052.45 1.135 1.499.78 3.208-.792 3.804-1.229.466-2.614.633-4.568.633-1.954 0-3.339-.167-4.568-.633-1.572-.596-1.927-2.305-.792-3.804.099-.13.118-.301.052-.45-.191-.432-.368-.87-.524-1.314-.148-.42-.569-.64-.997-.52-1.042.29-1.748-.68-1.576-1.616.096-.525.438-1.018 1.025-1.48.156-.123.18-.344.056-.496C3.992 9.61 3.5 7.828 4.298 6.43 5.38 4.53 8.35 3 12 3s6.62 1.53 7.702 3.43c.798 1.398.306 3.18-.382 4.606-.124.152-.1.373.056.496.587.462.929.955 1.025 1.48.172.936-.534 1.906-1.576 1.616-.428-.12-.849.1-1.014.52z"/>
    </svg>
  ),
  tumblr: (color = '#36465D') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M14.538 0v4.615h-2.769c-.731 0-1.385.615-1.385 1.385v2.769h4.154v4.615h-4.154V24H5.769v-10.62H2.998V8.769h2.771V3.23C5.769.923 7.615 0 10.385 0h4.153z"/>
    </svg>
  ),
  ok: (color = '#F2720C') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 4.1c-2.316 0-4.2 1.884-4.2 4.2s1.884 4.2 4.2 4.2 4.2-1.884 4.2-4.2-1.884-4.2-4.2-4.2zm0 1.6a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2zm0 8.1c-3.774 0-7 1.854-7 4.5v.5h14v-.5c0-2.646-3.226-4.5-7-4.5zm0 1.6c2.518 0 4.8 1.043 5.31 2.3h-10.62c.51-1.257 2.792-2.3 5.31-2.3z"/>
    </svg>
  ),
  rutube: (color = '#00F0FF') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm4.27 15.3c-.63 0-1.14-.51-1.14-1.14v-4.32c0-.63.51-1.14 1.14-1.14.63 0 1.14.51 1.14 1.14v4.32c0 .63-.51 1.14-1.14 1.14zm-4.27 0c-.63 0-1.14-.51-1.14-1.14V7.54c0-.63.51-1.14 1.14-1.14.63 0 1.14.51 1.14 1.14v6.62c0 .63-.51 1.14-1.14 1.14zm-4.27 0c-.63 0-1.14-.51-1.14-1.14v-2.02c0-.63.51-1.14 1.14-1.14.63 0 1.14.51 1.14 1.14v2.02c0 .63-.51 1.14-1.14 1.14z"/>
    </svg>
  ),
  newgrounds: (color = '#FFBF00') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.774 15.201a4.954 4.954 0 0 1-5.111.455c-1.393-.728-2.228-2.062-2.228-3.486 0-1.424.835-2.758 2.228-3.486a4.954 4.954 0 0 1 5.111.455.5.5 0 0 1-.582.812 3.954 3.954 0 0 0-4.085-.363c-1.114.582-1.672 1.583-1.672 2.582s.558 2 1.672 2.582a3.954 3.954 0 0 0 4.085-.363.5.5 0 0 1 .582.812z"/>
    </svg>
  ),
  streamable: (color = '#00D4B2') => (
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.27 15.82c-.63 0-1.14-.51-1.14-1.14v-4.32c0-.63.51-1.14 1.14-1.14.63 0 1.14.51 1.14 1.14v4.32c0 .63-.51 1.14-1.14 1.14z"/>
    </svg>
  ),
};

// Globe Icon for General cookie fallback
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

// Helper function to detect brand from URL
function detectService(urlStr) {
  if (!urlStr) return null;
  const url = urlStr.toLowerCase();
  
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('instagram.com')) return 'instagram';
  if (url.includes('tiktok.com')) return 'tiktok';
  if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
  if (url.includes('facebook.com')) return 'facebook';
  if (url.includes('reddit.com')) return 'reddit';
  if (url.includes('soundcloud.com')) return 'soundcloud';
  if (url.includes('pinterest.com') || url.includes('pin.it')) return 'pinterest';
  if (url.includes('bilibili.com') || url.includes('b23.tv')) return 'bilibili';
  if (url.includes('twitch.tv')) return 'twitch';
  if (url.includes('vimeo.com')) return 'vimeo';
  if (url.includes('vk.com')) return 'vk';
  if (url.includes('bsky.app')) return 'bluesky';
  if (url.includes('dailymotion.com') || url.includes('dai.ly')) return 'dailymotion';
  if (url.includes('loom.com')) return 'loom';
  if (url.includes('snapchat.com')) return 'snapchat';
  if (url.includes('tumblr.com')) return 'tumblr';
  if (url.includes('ok.ru')) return 'ok';
  if (url.includes('rutube.ru')) return 'rutube';
  if (url.includes('newgrounds.com')) return 'newgrounds';
  if (url.includes('streamable.com')) return 'streamable';
  
  return null;
}

export default function Home() {
  // Navigation & Modal states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  
  // Form states
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('auto'); // auto, audio, mute
  const [quality, setQuality] = useState('720');
  
  // Multi-platform cookie states
  const [cookiesMap, setCookiesMap] = useState({
    youtube: '',
    instagram: '',
    tiktok: '',
    twitter: '',
    facebook: '',
    reddit: '',
    bilibili: '',
    general: ''
  });
  const [activeCookiePlatform, setActiveCookiePlatform] = useState('youtube');
  
  // Collapsed TUI scroll states
  const [collapsedScrollIndex, setCollapsedScrollIndex] = useState(0);
  const [isLogsExpanded, setIsLogsExpanded] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  
  // Customization
  const [theme, setTheme] = useState('classic'); // classic, slate, mocha, dracula
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [statusText, setStatusText] = useState('system ready');
  const [statusType, setStatusType] = useState('idle'); // idle, loading, success, error
  
  // Detected Brand states
  const [detectedBrand, setDetectedBrand] = useState(null);
  const [showDetectedToast, setShowDetectedToast] = useState(false);
  const [toastFadeOut, setToastFadeOut] = useState(false);
  
  // Gallery carousel state
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  // Real-time shell logs state
  const [logs, setLogs] = useState([
    { time: new Date().toTimeString().split(' ')[0], text: 'kobo-tui v1.0.0 initialized', type: 'system' },
    { time: new Date().toTimeString().split(' ')[0], text: 'ready to capture links...', type: 'system' }
  ]);

  // Refs
  const logsEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const collapsedLogsRef = useRef(null);
  const logsLengthRef = useRef(logs.length);

  // Keep logs length ref updated for the scroll listener
  useEffect(() => {
    logsLengthRef.current = logs.length;
    // Auto-scroll to latest on new logs
    setCollapsedScrollIndex(0);
  }, [logs.length]);

  // Intercept wheel scroll on collapsed logs
  useEffect(() => {
    const el = collapsedLogsRef.current;
    if (!el) return;

    const handleCollapsedWheel = (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        // Scroll up (older logs)
        setCollapsedScrollIndex((prev) => Math.min(prev + 1, logsLengthRef.current - 5));
      } else {
        // Scroll down (newer logs)
        setCollapsedScrollIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    el.addEventListener('wheel', handleCollapsedWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleCollapsedWheel);
    };
  }, [isTerminalOpen]);

  // Supported services list
  const services = [
    'youtube', 'bilibili', 'bluesky', 'dailymotion', 'facebook', 'instagram', 
    'loom', 'ok', 'pinterest', 'newgrounds', 'reddit', 'rutube', 
    'snapchat', 'soundcloud', 'streamable', 'tiktok', 'tumblr', 
    'twitch', 'twitter', 'vimeo', 'vk'
  ];

  // Helper to append client logs
  const addLog = (text, type = 'default') => {
    const time = new Date().toTimeString().split(' ')[0];
    setLogs((prev) => [...prev, { time, text, type }]);
  };

  // Scroll terminal logs to bottom
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollTop = logsEndRef.current.scrollHeight;
    }
  }, [logs, isTerminalOpen]);

  // Auto-detect brand when URL changes
  useEffect(() => {
    const brand = detectService(url);
    if (brand && brand !== detectedBrand) {
      setDetectedBrand(brand);
      setShowDetectedToast(true);
      setToastFadeOut(false);
      addLog(`detected ${brand} link`, 'success');
      
      // Auto-switch cookie platform to match detected brand if it exists in map
      if (cookiesMap[brand] !== undefined) {
        setActiveCookiePlatform(brand);
        addLog(`auto-selected cookie store: ${brand}`, 'system');
      }
      
      // Auto fade-out toast after 3 seconds
      const timer = setTimeout(() => {
        setToastFadeOut(true);
        setTimeout(() => setShowDetectedToast(false), 300);
      }, 3000);
      return () => clearTimeout(timer);
    } else if (!brand) {
      setDetectedBrand(null);
      setShowDetectedToast(false);
    }
  }, [url]);

  // Load cookies map and theme from localStorage on mount
  useEffect(() => {
    const savedCookiesMap = localStorage.getItem('kobo_cookies_map');
    const savedCookieLegacy = localStorage.getItem('kobo_cookie');
    const savedTheme = localStorage.getItem('kobo_theme');
    const savedQuality = localStorage.getItem('kobo_quality');
    
    if (savedCookiesMap) {
      setCookiesMap(JSON.parse(savedCookiesMap));
      addLog('loaded custom cookie store map', 'system');
    } else if (savedCookieLegacy) {
      // Migrate legacy single cookie to youtube & general
      const migrated = {
        youtube: savedCookieLegacy,
        instagram: '',
        tiktok: '',
        twitter: '',
        facebook: '',
        reddit: '',
        bilibili: '',
        general: savedCookieLegacy
      };
      setCookiesMap(migrated);
      localStorage.setItem('kobo_cookies_map', JSON.stringify(migrated));
      localStorage.removeItem('kobo_cookie'); // clean up legacy
      addLog('migrated legacy cookie store to multi-platform map', 'system');
    }

    if (savedQuality) setQuality(savedQuality);
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.setAttribute('data-theme', savedTheme);
      addLog(`active colour scheme: ${savedTheme}`, 'system');
    } else {
      document.body.setAttribute('data-theme', 'classic');
      addLog('active colour scheme: classic', 'system');
    }
  }, []);

  // Update theme dynamically
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('kobo_theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
    addLog(`switched colour scheme to: ${newTheme}`, 'system');
  };

  const handleFormatChange = (newFormat) => {
    setFormat(newFormat);
    addLog(`switched download mode to: ${newFormat}`, 'system');
  };

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality);
    addLog(`set max quality limit: ${newQuality}p`, 'system');
  };

  // Handle Cookie text modifications
  const handleCookieTextChange = (val) => {
    setCookiesMap((prev) => ({
      ...prev,
      [activeCookiePlatform]: val
    }));
  };

  // Handle Cookie File Upload
  const handleCookieFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setCookiesMap((prev) => ({
        ...prev,
        [activeCookiePlatform]: content
      }));
      addLog(`imported ${activeCookiePlatform} cookies from ${file.name}`, 'success');
    };
    reader.onerror = (err) => {
      console.error('Failed to read cookie file:', err);
      addLog('failed to read cookie file', 'error');
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  // Explicit Paste Handler for Input Box
  const handleExplicitPaste = (e) => {
    e.preventDefault(); // Stops the browser from pasting twice
    const pastedText = e.clipboardData.getData('text');
    if (pastedText) {
      setUrl(pastedText);
      setStatusType('success');
      setStatusText('pasted');
      addLog(`intercepted clipboard paste: ${pastedText.substring(0, 32)}...`, 'default');
      setTimeout(() => {
        setStatusType('idle');
        setStatusText('system ready');
      }, 1500);
    }
  };

  // Handle Clipboard Button Paste with Fallback
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setStatusType('success');
      setStatusText('Link pasted from clipboard');
      addLog(`read link via clipboard button: ${text.substring(0, 32)}...`, 'default');
      setTimeout(() => {
        setStatusType('idle');
        setStatusText('system ready');
      }, 2000);
    } catch (err) {
      console.error('Failed to read clipboard: ', err);
      
      // Fallback: Focus the input field so the user can paste manually
      const inputEl = document.querySelector('.input-bar');
      if (inputEl) {
        inputEl.focus();
      }
      
      setStatusType('error');
      setStatusText('Please paste manually (Ctrl+V / Long-press)');
      addLog('clipboard read blocked by browser. focused input for manual paste.', 'error');
      setTimeout(() => {
        setStatusType('idle');
        setStatusText('system ready');
      }, 4000);
    }
  };

  const handleResolve = async (e) => {
    if (e) e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setError(null);
    setResult(null);
    setCurrentGalleryIndex(0);
    setStatusType('loading');
    setStatusText('resolving media stream...');
    
    // Auto-detect brand to fetch correct cookies
    const urlBrand = detectService(url) || 'general';
    const resolvedCookie = cookiesMap[urlBrand] || cookiesMap['general'] || '';
    
    addLog(`resolving ${urlBrand} stream: ${url.substring(0, 40)}...`, 'system');
    if (resolvedCookie) {
      addLog(`injecting saved cookie session for ${urlBrand}`, 'system');
    }
    
    // Save settings to localStorage
    localStorage.setItem('kobo_cookies_map', JSON.stringify(cookiesMap));
    localStorage.setItem('kobo_quality', quality);

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          quality,
          format,
          cookie: resolvedCookie,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.text || `Server returned ${response.status}`);
      }

      let mediaType = 'video';
      let galleryUrls = [];
      let downloadUrl = '';

      if (data.status === 'picker') {
        const isImage = data.picker[0]?.type === 'image' || 
                        data.picker[0]?.url?.toLowerCase().includes('.jpg') || 
                        data.picker[0]?.url?.toLowerCase().includes('.png') || 
                        data.picker[0]?.url?.toLowerCase().includes('.webp') || 
                        data.picker[0]?.url?.toLowerCase().includes('.gif');
        
        mediaType = isImage ? 'picker' : 'video';
        galleryUrls = data.picker.map(item => item.url);
        downloadUrl = data.picker[0]?.url;
        addLog(`resolved multi-media picker gallery (${data.picker.length} items)`, 'success');
      } else {
        downloadUrl = data.url;
        const path = new URL(downloadUrl).pathname.toLowerCase();
        const isImage = path.endsWith('.jpg') || 
                        path.endsWith('.jpeg') || 
                        path.endsWith('.png') || 
                        path.endsWith('.webp') || 
                        path.endsWith('.gif');
        const isAudio = format === 'audio';

        if (isImage) {
          mediaType = 'image';
        } else if (isAudio) {
          mediaType = 'audio';
        }
        addLog(`resolved single media stream url successfully`, 'success');
      }

      setResult({
        title: data.filename || (mediaType === 'audio' ? 'Cobalt Audio' : mediaType === 'image' ? 'Cobalt Image' : 'Cobalt Video'),
        downloadUrl,
        type: mediaType,
        galleryUrls,
      });

      setStatusType('success');
      setStatusText('stream resolved');
      addLog(`media filename resolved: ${data.filename || 'Cobalt Media'}`, 'success');

    } catch (err) {
      setError(err.message);
      setStatusType('error');
      setStatusText('failed to resolve');
      addLog(`resolution error: ${err.message}`, 'error');
      setIsErrorModalOpen(true); // Open the cookie guide modal
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="logo" onClick={() => { setUrl(''); setResult(null); addLog('cleared workspace', 'system'); }} style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '4px 0 12px 0' }}>
            <svg width="28" height="28" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}>
              {/* Ears */}
              <path d="M25 50L15 20L45 35" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M95 50L105 20L75 35" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Head Outline */}
              <path d="M25 50C15 65 15 85 30 98C45 110 75 110 90 98C105 85 105 65 95 50C90 42 78 38 60 38C42 38 30 42 25 50Z" fill="black" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Forehead Stripes */}
              <path d="M60 46L60 56" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              <path d="M52 48L55 56" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              <path d="M68 48L65 56" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              {/* Eyes */}
              <path d="M36 68C40 64 45 64 49 68" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              <path d="M71 68C75 64 80 64 84 68" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              {/* Cheeks */}
              <path d="M24 74L30 74" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <path d="M96 74L90 74" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              {/* Nose & Mouth */}
              <path d="M56 76C58 74 62 74 64 76" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              <path d="M52 83C56 86 60 86 60 83C60 86 64 86 68 83" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              {/* Paws Folded */}
              <path d="M42 98C50 94 70 94 78 98" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
            </svg>
          </div>
          <button 
            className="sidebar-btn active"
            onClick={() => {
              setResult(null);
              setUrl('');
              addLog('reset downloader state', 'system');
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>save</span>
          </button>
        </div>

        <div className="sidebar-bottom">
          <button className="sidebar-btn" onClick={() => { setIsSettingsOpen(true); addLog('opened settings panel', 'system'); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <span>settings</span>
          </button>
          <button className="sidebar-btn" onClick={() => { setIsDonateOpen(true); addLog('opened donate popup', 'system'); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>donate</span>
          </button>
          <button className="sidebar-btn" onClick={() => { window.open('https://github.com/Hotaro26/kobo', '_blank'); addLog('redirecting to github repo', 'system'); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>star</span>
          </button>
          <button className="sidebar-btn" onClick={() => { setIsAboutOpen(true); addLog('opened about modal', 'system'); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>about</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-layout">
        {/* Top Centered Action */}
        <div className="top-bar-action" onClick={() => { setIsServicesOpen(!isServicesOpen); addLog(`${isServicesOpen ? 'closed' : 'opened'} supported services dropdown`, 'system'); }}>
          <span>{isServicesOpen ? 'x' : '+'}</span>
          <span>supported services</span>
        </div>

        {/* Supported Services Dropdown */}
        {isServicesOpen && (
          <>
            <div 
              style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 90, background: 'transparent' }} 
              onClick={() => { setIsServicesOpen(false); addLog('closed services dropdown via backdrop click', 'system'); }} 
            />
            <div className="services-dropdown">
              <div className="services-grid">
                {services.map((service) => (
                  <span key={service} className="service-pill">
                    {BRAND_ICONS[service] ? BRAND_ICONS[service]() : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>
                    )}
                    {service}
                  </span>
                ))}
              </div>
              <p className="services-warning">
                support for a service does not imply affiliation, endorsement, or any form of support other than technical compatibility.
              </p>
            </div>
          </>
        )}

        {/* Top Right Action Button */}
        <div className="top-right-action">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>

        {/* Central Core Downloader */}
        <div className="center-container">
          {/* Cobalt Mascot Vector */}
          <div className="mascot-container">
            <svg width="110" height="110" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Ears */}
              <path d="M25 50L15 20L45 35" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M95 50L105 20L75 35" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Head Outline */}
              <path d="M25 50C15 65 15 85 30 98C45 110 75 110 90 98C105 85 105 65 95 50C90 42 78 38 60 38C42 38 30 42 25 50Z" fill="black" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Forehead Stripes */}
              <path d="M60 46L60 56" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              <path d="M52 48L55 56" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              <path d="M68 48L65 56" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              {/* Eyes */}
              <path d="M36 68C40 64 45 64 49 68" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              <path d="M71 68C75 64 80 64 84 68" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              {/* Cheeks */}
              <path d="M24 74L30 74" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <path d="M96 74L90 74" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              {/* Nose & Mouth */}
              <path d="M56 76C58 74 62 74 64 76" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              <path d="M52 83C56 86 60 86 60 83C60 86 64 86 68 83" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              {/* Paws Folded */}
              <path d="M42 98C50 94 70 94 78 98" stroke="white" strokeWidth="4.5" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Search/URL bar */}
          <div className="input-bar-wrapper">
            <div className={`input-bar-icon ${detectedBrand ? 'detected' : ''}`}>
              {detectedBrand && BRAND_ICONS[detectedBrand] ? (
                BRAND_ICONS[detectedBrand]()
              ) : (
                <svg width="18" height="18" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Ears */}
                  <path d="M25 50L15 20L45 35" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M95 50L105 20L75 35" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Head Outline */}
                  <path d="M25 50C15 65 15 85 30 98C45 110 75 110 90 98C105 85 105 65 95 50C90 42 78 38 60 38C42 38 30 42 25 50Z" fill="black" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Forehead Stripes */}
                  <path d="M60 46L60 56" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round"/>
                  <path d="M52 48L55 56" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round"/>
                  <path d="M68 48L65 56" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round"/>
                  {/* Eyes */}
                  <path d="M36 68C40 64 45 64 49 68" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round"/>
                  <path d="M71 68C75 64 80 64 84 68" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round"/>
                  {/* Cheeks */}
                  <path d="M24 74L30 74" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
                  <path d="M96 74L90 74" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
                  {/* Nose & Mouth */}
                  <path d="M56 76C58 74 62 74 64 76" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round"/>
                  <path d="M52 83C56 86 60 86 60 83C60 86 64 86 68 83" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round"/>
                  {/* Paws Folded */}
                  <path d="M42 98C50 94 70 94 78 98" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
                </svg>
              )}
            </div>
            <input
              type="url"
              className="input-bar"
              placeholder="paste the link here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onPaste={handleExplicitPaste}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleResolve();
              }}
            />
            {url && (
              <button 
                type="button" 
                className="input-clear-btn" 
                onClick={() => {
                  setUrl('');
                  setResult(null);
                  addLog('cleared URL input', 'system');
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>

          {/* Option Pills Row */}
          <div className="options-row">
            {/* Format settings */}
            <div className="chips-group">
              <button 
                type="button"
                className={`chip ${format === 'auto' ? 'active' : ''}`}
                onClick={() => handleFormatChange('auto')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>auto</span>
              </button>
              <button 
                type="button"
                className={`chip ${format === 'audio' ? 'active' : ''}`}
                onClick={() => handleFormatChange('audio')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
                <span>audio</span>
              </button>
              <button 
                type="button"
                className={`chip ${format === 'mute' ? 'active' : ''}`}
                onClick={() => handleFormatChange('mute')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                  <path d="M9 9v6a3 3 0 0 0 3 3h1.586l4.707 4.707A1 1 0 0 0 20 22V4a1 1 0 0 0-1.707-.707L13.586 8H12a3 3 0 0 0-3 3z"></path>
                </svg>
                <span>mute</span>
              </button>
            </div>

            {/* Paste & Download Action Chips */}
            <div className="chips-group">
              <button 
                type="button"
                className="chip"
                onClick={handlePaste}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
                <span>paste</span>
              </button>

              <button 
                type="button"
                className="chip active"
                onClick={handleResolve}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="spinner" style={{ width: '12px', height: '12px' }} />
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                )}
                <span>{isLoading ? 'resolving' : 'download'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Brand Detected Toast (Bottom Left) */}
        {showDetectedToast && detectedBrand && BRAND_ICONS[detectedBrand] && (
          <div className={`brand-detected-toast ${toastFadeOut ? 'fade-out' : ''}`}>
            {BRAND_ICONS[detectedBrand]()}
            <span>{detectedBrand} link detected</span>
          </div>
        )}

        {/* Real-time Floating TUI Logs (Bottom Right) */}
        {!isTerminalOpen && (
          isLogsExpanded ? (
            <div 
              className="tui-collapsed-logs" 
              ref={collapsedLogsRef}
              onClick={() => { setIsTerminalOpen(true); addLog('opened TUI shell overlay', 'system'); }}
            >
              <div className="tui-collapsed-header" onClick={(e) => e.stopPropagation()}>
                <span>kobo@logs</span>
                <span className="tui-collapsed-close" onClick={() => { setIsLogsExpanded(false); addLog('collapsed TUI logs to pill', 'system'); }}>×</span>
              </div>
              {(() => {
                const endIndex = logs.length - collapsedScrollIndex;
                const startIndex = Math.max(0, endIndex - 5);
                const visibleLogs = logs.slice(startIndex, endIndex);
                return (
                  <>
                    {visibleLogs.map((log, idx, arr) => (
                      <div key={idx} className="tui-collapsed-line">
                        <span className="tui-log-time">[{log.time}]</span>
                        <span className={`tui-log-message ${log.type}`}>
                          {log.text}
                        </span>
                        {idx === arr.length - 1 && collapsedScrollIndex === 0 && (
                          <span className="shell-pill-cursor" style={{ width: '6px', height: '12px', marginLeft: '4px' }} />
                        )}
                      </div>
                    ))}
                    {collapsedScrollIndex > 0 && (
                      <div style={{ fontSize: '0.62rem', color: 'var(--accent)', opacity: 0.4, marginTop: '2px', alignSelf: 'flex-start' }}>
                        [scroll down to return]
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          ) : (
            <button 
              type="button" 
              className="tui-pill" 
              onClick={() => { setIsLogsExpanded(true); addLog('expanded TUI logs from pill', 'system'); }}
            >
              <span className="shell-pill-cursor" style={{ width: '5px', height: '10px', marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} />
              logs
            </button>
          )
        )}

        {/* Muted Status Toast */}
        {statusType !== 'idle' && (
          <div className="status-toast">
            <div className={`status-dot ${statusType}`} />
            <span>{statusText}</span>
          </div>
        )}

        {/* Footer Ethics Text */}
        <footer className="footer-text" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>developed by</span>
          <a 
            href="https://github.com/Hotaro26" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: 'var(--foreground)', fontWeight: '500' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            Hotaro
          </a>
        </footer>
      </main>

      {/* RETRO TUI TERMINAL OVERLAY */}
      {isTerminalOpen && (
        <>
          <div 
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 140, background: 'transparent' }} 
            onClick={() => { setIsTerminalOpen(false); addLog('closed TUI shell via backdrop click', 'system'); }} 
          />
          <div className="tui-terminal">
            <div className="tui-header">
              <span className="tui-title">┌── kobo@sh: ~ ────────────────┐</span>
              <span className="tui-close" onClick={() => { setIsTerminalOpen(false); addLog('closed TUI shell overlay', 'system'); }}>×</span>
            </div>
            <div className="tui-logs" ref={logsEndRef}>
              {logs.map((log, idx) => (
                <div key={idx} className="tui-log-line">
                  <span className="tui-log-time">[{log.time}]</span>
                  <span className={`tui-log-message ${log.type}`}>
                    {log.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="tui-prompt">
              <span>$</span>
              <span>{isLoading ? 'resolving stream...' : 'listening for link inputs...'}</span>
              <span className="shell-pill-cursor" style={{ width: '6px', height: '12px', marginLeft: '-2px' }} />
            </div>
          </div>
        </>
      )}

      {/* SETTINGS MODAL */}
      {isSettingsOpen && (
        <div className="modal-backdrop" onClick={() => { setIsSettingsOpen(false); addLog('closed settings via backdrop click', 'system'); }}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Settings</h3>
              <button className="modal-close" onClick={() => { setIsSettingsOpen(false); addLog('closed settings panel', 'system'); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Dedicated Cookie Section */}
            <div className="form-group">
              <label htmlFor="modal-cookie">
                <span className="label-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5z"></path>
                    <circle cx="8.5" cy="8.5" r="1"></circle>
                    <circle cx="16" cy="15.5" r="1"></circle>
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="11" cy="16" r="1"></circle>
                    <circle cx="7" cy="13" r="1"></circle>
                  </svg>
                  Dedicated Cookie Store ({activeCookiePlatform})
                </span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button type="button" className="pill-action-btn" onClick={() => fileInputRef.current?.click()}>
                    Import File
                  </button>
                  {cookiesMap[activeCookiePlatform] && (
                    <button 
                      type="button" 
                      className="pill-action-btn" 
                      onClick={() => {
                        setCookiesMap(prev => ({ ...prev, [activeCookiePlatform]: '' }));
                        addLog(`cleared cookie buffer for ${activeCookiePlatform}`, 'system');
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </label>
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept=".txt,.json" 
                onChange={handleCookieFileUpload} 
              />
              <textarea
                id="modal-cookie"
                className="input-field"
                value={cookiesMap[activeCookiePlatform] || ''}
                onChange={(e) => handleCookieTextChange(e.target.value)}
                placeholder={`Paste ${activeCookiePlatform} cookies here...`}
                rows="3"
              />
              
              {/* Cookie Platform Selector (Pills Row Below Placeholder) */}
              <div className="cookie-platform-selector">
                {Object.keys(cookiesMap).map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    className={`platform-cookie-btn ${activeCookiePlatform === platform ? 'active' : ''}`}
                    onClick={() => {
                      setActiveCookiePlatform(platform);
                      addLog(`selected cookie profile: ${platform}`, 'system');
                    }}
                    title={`Configure ${platform} cookies`}
                  >
                    {platform === 'general' ? (
                      <GlobeIcon />
                    ) : BRAND_ICONS[platform] ? (
                      BRAND_ICONS[platform]()
                    ) : (
                      <span style={{ fontSize: '0.6rem', fontWeight: 'bold' }}>
                        {platform.substring(0, 2).toUpperCase()}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              
              <p className="cookie-hint">
                Select a platform icon above, then paste or import its cookies. Only the matching cookie will be injected during download.
              </p>
            </div>

            {/* Quality Limit */}
            <div className="form-group" style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <label htmlFor="modal-quality">
                <span className="label-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                  Video Quality Limit
                </span>
              </label>
              <select
                id="modal-quality"
                className="input-field"
                value={quality}
                onChange={(e) => handleQualityChange(e.target.value)}
              >
                <option value="1080">1080p</option>
                <option value="720">720p</option>
                <option value="480">480p</option>
                <option value="360">360p</option>
              </select>
            </div>

            {/* Colour Scheme Switcher */}
            <div className="form-group" style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <label>
                <span className="label-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.5 17.5 2 12 2S2 6.5 2 12c0 1.5.8 2.8 2 3.5V19a3 3 0 0 0 3 3h5z"></path>
                    <circle cx="7.5" cy="10.5" r="1.5"></circle>
                    <circle cx="11.5" cy="7.5" r="1.5"></circle>
                    <circle cx="16.5" cy="9.5" r="1.5"></circle>
                  </svg>
                  Colour Scheme
                </span>
              </label>
              <div className="theme-selector-grid">
                <button 
                  type="button" 
                  className={`theme-btn ${theme === 'classic' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('classic')}
                >
                  Classic Black
                </button>
                <button 
                  type="button" 
                  className={`theme-btn ${theme === 'slate' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('slate')}
                >
                  Slate Grey
                </button>
                <button 
                  type="button" 
                  className={`theme-btn ${theme === 'mocha' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('mocha')}
                >
                  Nord Mocha
                </button>
                <button 
                  type="button" 
                  className={`theme-btn ${theme === 'dracula' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('dracula')}
                >
                  Dracula Pink
                </button>
              </div>
            </div>

            <button 
              type="button"
              className="btn"
              style={{ width: '100%', background: '#fff', color: '#000', border: 'none', marginTop: '8px' }}
              onClick={() => {
                localStorage.setItem('kobo_cookies_map', JSON.stringify(cookiesMap));
                localStorage.setItem('kobo_quality', quality);
                setIsSettingsOpen(false);
                addLog('saved settings configuration successfully', 'success');
              }}
            >
              Save & Close
            </button>
          </div>
        </div>
      )}

      {/* ERROR / COOKIE TUTORIAL MODAL */}
      {isErrorModalOpen && (
        <div className="modal-backdrop" onClick={() => { setIsErrorModalOpen(false); addLog('closed error modal via backdrop click', 'system'); }}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3 style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '20px', height: '20px' }}>
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                Download Failed
              </h3>
              <button className="modal-close" onClick={() => { setIsErrorModalOpen(false); addLog('closed error modal', 'system'); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
              {error && (
                <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', padding: '12px', borderRadius: '8px', fontFamily: 'monospace', marginBottom: '18px' }}>
                  Error: {error}
                </div>
              )}

              <p style={{ marginBottom: '14px', color: 'var(--foreground)' }}>
                <strong>Why did this happen?</strong>
              </p>
              <p style={{ color: 'var(--muted-hover)', marginBottom: '18px' }}>
                Platforms (like YouTube or Instagram) frequently block cloud server IP addresses, or this video might be age-restricted, private, or region-locked.
              </p>

              <p style={{ marginBottom: '10px', color: 'var(--foreground)' }}>
                <strong>How to bypass this using cookies:</strong>
              </p>
              
              <ol style={{ paddingLeft: '20px', color: 'var(--muted-hover)', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                <li>
                  Install a browser extension like <strong>Get cookies.txt</strong> (for Chrome/Edge/Brave) or <strong>Export Cookies</strong> (for Firefox).
                </li>
                <li>
                  Open the platform website (e.g., <strong>youtube.com</strong>) in your browser and make sure you are logged in.
                </li>
                <li>
                  Click the extension icon, copy/export your cookies as text to your clipboard.
                </li>
                <li>
                  Click the <strong>Open Settings</strong> button below, paste the copied text into the <strong>Dedicated Cookie Store</strong>, and save.
                </li>
                <li>
                  Try resolving your link again!
                </li>
              </ol>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="button"
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={() => { setIsErrorModalOpen(false); addLog('closed error modal', 'system'); }}
              >
                Close
              </button>
              <button 
                type="button"
                className="btn"
                style={{ flex: 1.2, background: '#fff', color: '#000', border: 'none', fontWeight: '600' }}
                onClick={() => {
                  setIsErrorModalOpen(false);
                  setIsSettingsOpen(true);
                  addLog('transited from error modal to settings panel', 'system');
                }}
              >
                Open Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DONATE MODAL */}
      {isDonateOpen && (
        <div className="modal-backdrop" onClick={() => { setIsDonateOpen(false); addLog('closed donate popup via backdrop click', 'system'); }}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Donate to Project</h3>
              <button className="modal-close" onClick={() => { setIsDonateOpen(false); addLog('closed donate popup', 'system'); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              {/* QR Code Outline Placeholder */}
              <div className="qr-placeholder">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  <line x1="17" y1="7" x2="17.01" y2="7"></line>
                  <line x1="17" y1="17" x2="17.01" y2="17"></line>
                  <line x1="7" y1="17" x2="7.01" y2="17"></line>
                </svg>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--muted-hover)', marginBottom: '16px', lineHeight: '1.4' }}>
                Scan the QR code above or use the UPI ID to support Kobo development.
              </p>
              
              <div 
                style={{ 
                  background: '#000', 
                  border: '1px solid var(--border)', 
                  padding: '12px', 
                  borderRadius: '8px', 
                  fontSize: '0.85rem', 
                  fontFamily: 'monospace', 
                  marginBottom: '24px',
                  color: 'var(--accent)'
                }}
              >
                UPI ID: [will be added later]
              </div>
            </div>

            <button 
              type="button"
              className="btn"
              style={{ width: '100%', background: '#fff', color: '#000', border: 'none' }}
              onClick={() => { setIsDonateOpen(false); addLog('closed donate popup', 'system'); }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* RESOLVED MEDIA OVERLAY */}
      {result && (
        <div className="preview-overlay" onClick={() => { setResult(null); addLog('closed media preview overlay', 'system'); }}>
          <button className="preview-close-btn" onClick={() => { setResult(null); addLog('closed media preview', 'system'); }}>
            Close Preview
          </button>

          <div className="preview-viewport" onClick={(e) => e.stopPropagation()}>
            <div className="preview-media-wrapper">
              {result.type === 'video' && (
                <video src={result.downloadUrl} controls preload="metadata" />
              )}
              
              {result.type === 'image' && (
                <img src={result.downloadUrl} alt={result.title} />
              )}

              {result.type === 'picker' && (
                <>
                  <img src={result.galleryUrls[currentGalleryIndex]} alt={`Gallery item ${currentGalleryIndex + 1}`} />
                  
                  {result.galleryUrls.length > 1 && (
                    <>
                      <button 
                        type="button"
                        className="carousel-nav carousel-prev"
                        onClick={() => {
                          const nextIdx = currentGalleryIndex > 0 ? currentGalleryIndex - 1 : result.galleryUrls.length - 1;
                          setCurrentGalleryIndex(nextIdx);
                          addLog(`carousel: navigated to slide ${nextIdx + 1}`, 'system');
                        }}
                      >
                        ◀
                      </button>
                      <button 
                        type="button"
                        className="carousel-nav carousel-next"
                        onClick={() => {
                          const nextIdx = currentGalleryIndex < result.galleryUrls.length - 1 ? currentGalleryIndex + 1 : 0;
                          setCurrentGalleryIndex(nextIdx);
                          addLog(`carousel: navigated to slide ${nextIdx + 1}`, 'system');
                        }}
                      >
                        ▶
                      </button>
                      <div className="carousel-counter">
                        {currentGalleryIndex + 1} / {result.galleryUrls.length}
                      </div>
                    </>
                  )}
                </>
              )}

              {result.type === 'audio' && (
                <div className="preview-audio-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                  </svg>
                  <audio src={result.downloadUrl} controls style={{ width: '85%' }} />
                </div>
              )}
            </div>

            <div className="preview-details">
              <div className="preview-title">{result.title}</div>
              <div className="preview-meta">
                <span>{result.type.toUpperCase()}</span>
                <span>Resolved</span>
              </div>
              
              <a 
                href={`/api/stream?url=${encodeURIComponent(result.type === 'picker' ? result.galleryUrls[currentGalleryIndex] : result.downloadUrl)}&filename=${encodeURIComponent(result.title.includes('.') ? result.title : `${result.title}.${result.type === 'audio' ? 'mp3' : (result.type === 'image' || result.type === 'picker' ? 'jpg' : 'mp4')}`)}`}
                className="btn"
                style={{ textDecoration: 'none', background: '#fff', color: '#000', fontWeight: '600' }}
                onClick={() => addLog('dispatched stream pipe request to browser download manager', 'system')}
              >
                Download
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ABOUT MODAL */}
      {isAboutOpen && (
        <div className="modal-backdrop" onClick={() => { setIsAboutOpen(false); addLog('closed about modal via backdrop click', 'system'); }}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px', padding: '28px' }}>
            <div className="modal-header" style={{ marginBottom: '16px' }}>
              <h3>About Kobo</h3>
              <button className="modal-close" onClick={() => { setIsAboutOpen(false); addLog('closed about modal', 'system'); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '12px' }}>
              {/* Left Column: Tech Info */}
              <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                {/* Mascot */}
                <svg width="60" height="60" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25 50L15 20L45 35" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M95 50L105 20L75 35" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M25 50C15 65 15 85 30 98C45 110 75 110 90 98C105 85 105 65 95 50C90 42 78 38 60 38C42 38 30 42 25 50Z" fill="black" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M60 46L60 56" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M52 48L55 56" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M68 48L65 56" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M36 68C40 64 45 64 49 68" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M71 68C75 64 80 64 84 68" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M24 74L30 74" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M96 74L90 74" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M56 76C58 74 62 74 64 76" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M52 83C56 86 60 86 60 83C60 86 64 86 68 83" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M42 98C50 94 70 94 78 98" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
                </svg>

                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>Kobo Downloader</h4>
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontFamily: 'monospace' }}>v1.0.0</span>
                </div>

                <p style={{ fontSize: '0.78rem', color: 'var(--muted-hover)', lineHeight: '1.4' }}>
                  A clean, minimalist media downloader built on Next.js. It leverages the Cobalt API to stream media directly to your device, bypassing trackers and ads.
                </p>

                <div style={{ width: '100%', borderTop: '1px solid var(--border)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.72rem', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--muted)' }}>Author:</span>
                    <a href="https://github.com/Hotaro26" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--foreground)', textDecoration: 'none', fontWeight: '500' }}>Hotaro</a>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--muted)' }}>Core Engine:</span>
                    <span style={{ color: 'var(--foreground)' }}>Cobalt API</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--muted)' }}>Source Code:</span>
                    <a href="https://github.com/Hotaro26/kobo" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--foreground)', textDecoration: 'none', fontWeight: '500' }}>GitHub Repo</a>
                  </div>
                </div>
              </div>

              {/* Right Column: Sideways Story Box */}
              <div style={{ 
                flex: '1 1 280px', 
                background: 'rgba(255, 255, 255, 0.01)', 
                border: '1px dashed var(--border)', 
                padding: '20px', 
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '0.8rem',
                lineHeight: '1.5'
              }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                  The Story
                </h4>
                <p style={{ color: 'var(--foreground)' }}>
                  I use Pinterest constantly. When I needed to save media from it, I searched the internet only to find absolutely nothing useful.
                </p>
                <p style={{ color: 'var(--muted-hover)' }}>
                  The very few downloader tools that did exist were completely flooded with intrusive ads, popups, and slow redirects.
                </p>
                <p style={{ color: 'var(--muted-hover)' }}>
                  I built <strong>Kobo</strong> to solve this. It is designed to be a fast, clean, and completely ad-free alternative that just works.
                </p>
              </div>
            </div>

            <button 
              type="button" 
              className="btn" 
              style={{ background: '#fff', color: '#000', border: 'none', marginTop: '20px', fontWeight: '600' }}
              onClick={() => { setIsAboutOpen(false); addLog('closed about modal', 'system'); }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
