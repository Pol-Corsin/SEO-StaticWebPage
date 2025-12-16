**Visibilidad y promoción para "Know Your Settings" (guía breve)**

- **Dominio y HTTPS**: compra un dominio corto y relacionado (ej: knowyoursettings.gg). Configura HTTPS con Let's Encrypt (certbot) o mediante tu proveedor (Cloudflare, Netlify, Vercel) para seguridad y mejor ranking.

- **Sitemap y robots.txt**: publica `sitemap.xml` y `robots.txt` en la raíz. Envía sitemap a Google Search Console y Bing Webmaster Tools.

- **Optimización on-page (SEO técnico)**:
  - Títulos únicos y meta descriptions en cada página. Usa palabras clave como "osu settings", "osu playstyle", "mouse settings osu".
  - URLs limpias (`/keyboards.html` → `/keyboards/` usando servidor).
  - Uso de encabezados semánticos (`h1`, `h2`, `h3`).
  - Implementa datos estructurados (Schema.org, Article/FAQ) donde aporte.
  - Mobile-friendly: prueba con Mobile-Friendly Test y corrige problemas; usa viewport meta (ya incluido).

- **Rendimiento y optimización de imágenes**:
  - Usa WebP/AVIF cuando sea posible. Incluye `srcset` y `loading="lazy"` (ya aplicado).
  - Comprime imágenes y sirve versiones responsivas.
  - Minimiza CSS/JS y habilita caching y gzip/brotli en servidor.

- **Contenido y comunidad**:
  - Escribe guías detalladas para playstyles: mouse vs tablet, tablet drag vs hover, keyboard index/middle/ring.
  - Incluye ejemplos de configuración (DPI, sensitivity, keybinds) y comparativas.
  - Publica contenido regularmente y agrega comentarios para interacción (ya implementado).

- **Backlinks y comunidad osu!**:
  - Participa en foros oficiales y subreddits: r/osugame y foros de osu!. Comparte guías útiles (no spam).
  - Colabora con creadores de contenido (YouTube/Twitch) y pide enlaces en descripciones.
  - Añade la web al perfil de Discord/Reddit y en firmas de foros.

- **Social & shareability**:
  - Añade Open Graph meta tags y Twitter cards para mejor aspecto al compartir.
  - Crea imágenes atractivas para compartir (1200x630 OG image).

- **Analítica y feedback**:
  - Instala Google Analytics / Matomo para medir tráfico.
  - Usa Search Console para ver palabras clave y errores de rastreo.
  - Habilita formularios de feedback y comentarios para iterar contenido.

- **Seguridad**:
  - Habilita HTTPS, Content Security Policy (CSP), y HSTS en producción.
  - Limita inyección de scripts y valida entradas de usuarios (en el front-end usamos localStorage; para producción usar backend con sanitización).

- **Opciones de hosting rápidas con SSL**:
  - Netlify, Vercel o GitHub Pages (con Cloudflare) facilitan HTTPS y despliegue continuo.

- **Monitoreo y crecimiento**:
  - Revisa rendimiento y Core Web Vitals.
  - Haz A/B testing con títulos y descripciones.
  - Publica guías en plataformas relevantes.

Si quieres, puedo:
- generar meta tags Open Graph y Twitter Card para cada página,
- preparar un archivo `robots.txt` y `sitemap.xml` finales con tu dominio,
- crear plantillas de contenido para guías de playstyle.

---
*Nota: reemplaza `your-domain.example` por tu dominio real en `sitemap.xml` y `robots.txt`.*
