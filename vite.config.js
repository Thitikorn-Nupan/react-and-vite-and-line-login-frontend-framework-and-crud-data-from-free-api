import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
// vite.config.js
import basicSsl from '@vitejs/plugin-basic-ssl'

// ** for getting env files
import dotenv from "dotenv";
dotenv.config({ path: __dirname + '/env/.env' });
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        basicSsl()
    ],
    define: {
        // we have to set key : value for call by process.env.<key>
        'process.env.LIFF_ID': JSON.stringify(process.env.LIFF_ID),
    }
})
