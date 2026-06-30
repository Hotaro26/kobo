import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const filename = searchParams.get('filename');

  if (!url) {
    return new Response('URL is required', { status: 400 });
  }

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch source: ${response.statusText}`);
    }

    // Pipe the response body stream directly to the client
    const stream = response.body;

    const headers = new Headers();
    // Force the browser to trigger a direct file download/save dialog
    headers.set('Content-Disposition', `attachment; filename="${filename || 'download'}"`);
    headers.set('Content-Type', response.headers.get('Content-Type') || 'application/octet-stream');
    
    if (response.headers.get('Content-Length')) {
      headers.set('Content-Length', response.headers.get('Content-Length'));
    }

    return new Response(stream, {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error('Streaming error:', error);
    return new Response(`Failed to download: ${error.message}`, { status: 500 });
  }
}
