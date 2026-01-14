export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  
  /* Ambil data dari URL */
  const title = searchParams.get('t') || "Video Viral";
  const image = searchParams.get('i') || "";
  const domain = searchParams.get('dom') || "YOUTUBE.COM";
  const target = searchParams.get('url') || "https://google.com";
  const currentUrl = context.request.url; // Untuk og:url

  const html = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta property="og:url" content="${currentUrl}">
      <meta property="og:description" content="Tonton video selengkapnya di sini.">
      <meta property="fb:app_id" content="966242223397117"> <meta property="og:title" content="${title}">
      <meta property="og:image" content="${image}">
      <meta property="og:site_name" content="${domain}">
      
      <meta property="og:type" content="video.other">
      <meta property="og:video:url" content="${currentUrl}">
      <meta property="og:video:secure_url" content="${currentUrl}">
      <meta property="og:video:type" content="text/html">
      <meta property="og:video:width" content="1280">
      <meta property="og:video:height" content="720">

      <script>
        if (!navigator.userAgent.includes('facebookexternalhit')) {
          window.location.href = "${target}";
        }
      </script>
    </head>
    <body>Redirecting...</body>
    </html>
  `;

  return new Response(html, { headers: { "content-type": "text/html;charset=UTF-8" } });
}
