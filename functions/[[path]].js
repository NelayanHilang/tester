export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const title = searchParams.get('t') || "Video Viral";
  const image = searchParams.get('i') || "";
  const domain = searchParams.get('dom') || "YOUTUBE.COM"; // Ini kuncinya
  const target = searchParams.get('url') || "https://google.com";

  return new Response(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta property="og:title" content="${title}">
      <meta property="og:image" content="${image}">
      <meta property="og:site_name" content="${domain}">
      <meta property="og:type" content="video.other">
      <meta property="og:video:url" content="${context.request.url}">
      <meta property="og:video:type" content="text/html">
      <script>if(!navigator.userAgent.includes('facebookexternalhit')){window.location.href="${target}";}</script>
    </head>
    </html>`, { headers: { "content-type": "text/html" } });
}
