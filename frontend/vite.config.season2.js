import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'

function fixAllAssetPaths(season) {
  return {
    name: 'fix-all-asset-paths',
    enforce: 'post',
    closeBundle() {
      const outDir = path.resolve(__dirname, `../backend/public/${season}`)

      const fixPaths = dir => {
        const files = fs.readdirSync(dir)
        for (const file of files) {
          const filePath = path.join(dir, file)
          const stat = fs.statSync(filePath)
          if (stat.isDirectory()) {
            fixPaths(filePath)
          } else if (/\.(html|js|css|map)$/i.test(file)) {
            let content = fs.readFileSync(filePath, 'utf-8')
            // '/assets/' → '/season1/assets/'
            content = content.replace(/(["'(]|`)\s*\/assets\//g, `$1${season}/assets/`);
            fs.writeFileSync(filePath, content)
          }
        }
      }

      fixPaths(outDir)
      console.log(`✅ 모든 /assets 경로가 '/${season}/assets/'로 수정되었습니다.`)
    },
  }
}

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  const season = 'season2'

  return {
    root: path.resolve(__dirname, season),
    base: isBuild ? `/${season}/` : '/',
    plugins: [
      react(),
      isBuild && fixAllAssetPaths(season), // ✅ 빌드 후 실제 파일 경로 전체 수정
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
      historyApiFallback: true,
    },
  }
})
