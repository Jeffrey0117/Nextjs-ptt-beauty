// app/view/[slug]/page.js
export default async function ImageViewPage({ params }) {
    const slug = params.slug;
    const apiURL = `https://chatbot.digitalgo.synology.me/images.php?page=${slug}`;
    const res = await fetch(apiURL, { cache: 'no-store' });
    const images = await res.json();
  
    return (
      <div style={{ padding: 20 }}>
        <h2>文章圖片預覽</h2>

        <div
          style={{
            marginTop: 20,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 16,
          }}
        >
          {images.map((img, idx) => (
            <a key={idx} href={img.src} target="_blank" rel="noopener noreferrer">
              <img
                src={img.src}
                alt={`圖片 ${idx + 1}`}
                style={{ width: '100%', borderRadius: 8, objectFit: 'cover' }}
              />
            </a>
          ))}
        </div>
      </div>
    );
  }
  