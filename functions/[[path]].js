export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  
  // Mengambil data dari URL Parameter
  const title = searchParams.get('t') || "Video Terbaru";
  const image = searchParams.get('i') || "https://via.placeholder.com/600x315";
  const desc = searchParams.get('d') || "Klik untuk menonton selengkapnya...";
  const domain = searchParams.get('dom') || "NEWS-VIDEO.NET";
  const target = searchParams.get('url') || "https://google.com";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <meta property="og:type" content="video.other">
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${desc}">
      <meta property="og:image" content="${image}">
      <meta property="og:site_name" content="${domain}">
      <meta property="fb:app_id" content="966242223397117">
      <script>
        // Redirect jika bukan bot Facebook
        if (!navigator.userAgent.includes('facebookexternalhit')) {
          window.location.href = "${target}";
        }
      </script>
    </head>
    <body>Redirecting...</body>
    </html>
  `;

  return new Response(html, {
    headers: { "content-type": "text/html;charset=UTF-8" },
  });
}
