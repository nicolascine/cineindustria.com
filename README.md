# cineindustria.com

Estructura actual del proyecto:

- `public-site/`: sitio estatico publico.
- `everything-else/`: material interno, prototipos y archivos de trabajo locales.

Git ignora `everything-else/` desde la raiz.

Vercel usa la integracion nativa del repo y toma `public-site/` como salida publica mediante `vercel.json`.

Vista previa local del sitio publico:

```bash
cd public-site
python3 -m http.server 8000
```
