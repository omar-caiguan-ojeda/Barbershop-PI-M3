import styles from "./Home.module.css";
import { FacebookIconLarge, InstagramIconLarge, TikTokIconLarge, WhatsAppIconLarge } from "../../components/Footer/FooterIconsLarge";

function Home() {
    // Barberos y comentarios de ejemplo
    const barberos = [
      { nombre: "Carlos Gómez", foto: "https://randomuser.me/api/portraits/men/32.jpg" },
      { nombre: "Luis Martínez", foto: "https://randomuser.me/api/portraits/men/45.jpg" },
      { nombre: "Ana Torres", foto: "https://randomuser.me/api/portraits/women/65.jpg" },
      { nombre: "Miguel Ruiz", foto: "https://randomuser.me/api/portraits/men/77.jpg" }
    ];
    const comentarios = [
      { nombre: "Juan Pérez", texto: "¡Excelente atención y cortes de primera!" },
      { nombre: "María López", texto: "Ambiente agradable y profesionales muy atentos." },
      { nombre: "Pedro Sánchez", texto: "Siempre salgo conforme con mi look." },
      { nombre: "Lucía Fernández", texto: "Recomiendo la barbería al 100%." }
    ];
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.heroSection}>
                <div className="barberPole" />
                <div className={styles.heroImageWrapper}>
                  <img
                    src="https://www.peluker.com/blog/wp-content/uploads/2024/03/%C2%BFcuanto-cuesta-una-barberia.jpeg"
                    alt="Barbería Clásica"
                    className={styles.headerImage}
                  />
                  <h1 className={styles.heroTitle}>Bienvenido a Blade & Brush</h1>
                  <h2 className={styles.heroSubtitle}>Donde el estilo clásico y la atención moderna se encuentran</h2>
                </div>
            </div>
            <section className={styles.section} id="historia">
                <h2>Historia & Servicios</h2>
                <p>
                    Fundada en 1995, nuestra barbería ha sido un referente en la ciudad por su excelencia y dedicación. Con más de 25 años de experiencia, seguimos manteniendo la tradición y el arte del buen corte.<br/><br/>
                    <b>Servicios:</b>
                </p>
                <ul>
                    <li>Corte clásico y moderno</li>
                    <li>Afeitado tradicional con navaja</li>
                    <li>Arreglo de barba y bigote</li>
                    <li>Tratamientos capilares</li>
                </ul>
            </section>
            <section className={styles.section} id="barberos">
                <h2>Nuestros Barberos</h2>
                <div style={{ display: "flex", justifyContent: "center", gap: 30, flexWrap: "wrap" }}>
                    {barberos.map((b, i) => (
                        <div key={i} className={styles.barberoCard}>
                            <img src={b.foto} alt={b.nombre} style={{ width: 120, borderRadius: "50%", boxShadow: "0 2px 8px #0006" }} />
                            <p>{b.nombre}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className={styles.section} id="comentarios">
                <h2>Comentarios de Clientes</h2>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 30 }}>
                    {comentarios.map((c, i) => (
                        <div key={i} className={styles.comentarioCard}>
                            <p style={{ fontStyle: "italic" }}>&quot;{c.texto}&quot;</p>
                            <p>{c.nombre}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className={styles.section} id="contacto">
                <h2>Contacto</h2>
                <p>Puedes encontrarnos en Av. Principal 123, Ciudad. Tel: (011) 1234-5678</p>
                <p>Email: contacto@barberia.com</p>
                <div style={{ width: '100%', maxWidth: 600, margin: '22px auto 16px auto', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px #0002' }}>
                  <iframe
                    title="Ubicación Barbería"
                    src="https://www.google.com/maps?q=-34.6036844,-58.3815591&z=16&output=embed"
                    width="100%"
                    height="280"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 28 }}>
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookIconLarge size={54} /></a>
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIconLarge size={54} /></a>
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TikTokIconLarge size={54} /></a>
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsAppIconLarge size={54} /></a>
                </div>
            </section>
        </div>
    );
}

export default Home;
