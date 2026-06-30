import { NextResponse } from 'next/server';

// Robust, universal cookie sanitizer to parse Netscape, JSON, or Raw Header formats
function sanitizeCookie(rawCookie) {
  if (!rawCookie) return '';
  let cleaned = rawCookie.trim();

  // 1. Handle JSON Cookie format (e.g. EditThisCookie export)
  if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
    try {
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed)) {
        const cookiePairs = parsed
          .filter(c => c && c.name !== undefined && c.value !== undefined)
          .map(c => `${c.name.trim()}=${c.value.trim()}`);
        if (cookiePairs.length > 0) {
          return cookiePairs.join('; ');
        }
      }
    } catch (e) {
      // If JSON parsing fails, fall through to other formats
      console.warn('Failed to parse cookie as JSON, trying text formats:', e.message);
    }
  }

  // 2. Handle Netscape Cookie format (e.g. Get cookies.txt export)
  if (cleaned.includes('# Netscape') || cleaned.includes('\t')) {
    const lines = cleaned.split(/[\r\n]+/);
    const cookiePairs = [];
    
    for (const line of lines) {
      const trimmed = line.trim();
      // Skip comments and empty lines
      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }
      
      // Netscape cookies are tab-separated values
      const parts = trimmed.split('\t');
      // Column index 5 is Name, index 6 is Value
      if (parts.length >= 7) {
        const name = parts[5].trim();
        const value = parts[6].trim();
        if (name && value) {
          cookiePairs.push(`${name}=${value}`);
        }
      }
    }
    
    if (cookiePairs.length > 0) {
      return cookiePairs.join('; ');
    }
  }

  // 3. Handle standard HTTP Header format (e.g. Copy-pasted from browser DevTools)
  // Remove "Cookie: " prefix if copied directly from HTTP headers
  if (cleaned.toLowerCase().startsWith('cookie:')) {
    cleaned = cleaned.substring(7).trim();
  }
  
  // Remove surrounding quotes if present
  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    cleaned = cleaned.substring(1, cleaned.length - 1);
  }
  if (cleaned.startsWith("'") && cleaned.endsWith("'")) {
    cleaned = cleaned.substring(1, cleaned.length - 1);
  }
  
  // Replace newlines and carriage returns with spaces
  cleaned = cleaned.replace(/[\r\n]+/g, ' ');
  
  // Remove multiple consecutive spaces
  cleaned = cleaned.replace(/\s+/g, ' ');
  
  return cleaned;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { url, quality, format, cookie } = body;

    if (!url) {
      return NextResponse.json(
        { status: 'error', text: 'BAD_REQUEST: URL is required.' },
        { status: 400 }
      );
    }

    // Prepare Cobalt API payload
    const cobaltUrl = process.env.COBALT_API_URL || 'https://hotaro344yy-cobalt-api.hf.space/';
    
    const payload = {
      url: url,
      videoQuality: quality || '720',
      audioFormat: 'mp3',
      downloadMode: format || 'auto',
    };

    // If custom cookies are provided, sanitize and append them to the payload
    if (cookie && cookie.trim()) {
      const sanitized = sanitizeCookie(cookie);
      if (sanitized) {
        payload.cookie = sanitized;
      }
    }

    // Make request to Cobalt
    const response = await fetch(cobaltUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Cobalt API Error Response:', errText);
      return NextResponse.json(
        { status: 'error', text: `Cobalt API error: ${errText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Download API proxy error:', error);
    return NextResponse.json(
      { status: 'error', text: `INTERNAL_SERVER_ERROR: ${error.message}` },
      { status: 500 }
    );
  }
}
