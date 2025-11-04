import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// 💡 모든 HTML 내부 경로에서 /assets → /season1/assets 로 자동 치환
function fixHtmlAssetPaths(season) {
  return {
    name: 'fix-html-asset-paths',
    enforce: 'post',
    generateBundle(_, bundle) {
      for (const [fileName, file] of Object.entries(bundle)) {
        if (file.type === 'asset' && file.fileName.endsWith('.html')) {
          // <img src="/assets/...">, <link href="/assets/...">, <script src="/assets/...">
          file.source = file.source.replace(
            /(<(?:img|script|link)[^>]+(?:src|href)=["'])(\/assets\/)/g,
            `$1/${season}$2`
          )
        }
      }
    },
  }
}

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  const season = 'season2'

  return {
    root: path.resolve(__dirname, season),
    base: isBuild ? `/${season}/` : '/', // ✅ dev에선 '/', build에선 '/season1/'
    plugins: [
      react(),
      isBuild && fixHtmlAssetPaths(season), // ✅ 빌드 시 자동 치환
    ],
    publicDir: path.resolve(__dirname, `${season}/public`),
    build: {
      outDir: path.resolve(__dirname, `../backend/public/${season}`),
      emptyOutDir: true,
      assetsDir: 'assets',
    },
    server: {
      port: 5173,
      proxy: {
        '/admin': 'http://localhost:3000',
      },
      historyApiFallback: {
        rewrites: [{ from: /^\/$/, to: '/index.html' }],
        disableDotRule: true,
      },
    },
  }
})
