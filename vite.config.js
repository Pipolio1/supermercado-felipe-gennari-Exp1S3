import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// La base coincide con el nombre del repositorio para que los assets
// se resuelvan correctamente al desplegar en GitHub Pages.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/supermercado-felipe-gennari-Exp1S3/',
});
