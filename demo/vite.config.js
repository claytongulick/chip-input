/** @type {import('vite').UserConfig} */
export default {
    server: {
        port: 8100,
        host: "0.0.0.0",
        watch: true,
        hmr: false,
    },
    build: {
        minify: false,
        sourcemap: true,
    },
};
