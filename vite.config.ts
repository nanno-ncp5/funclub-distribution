import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // ローカル開発時のポート（空いているポートに自動変更可）
    open: true,  // サーバー起動時にブラウザを自動で開く
  },
});