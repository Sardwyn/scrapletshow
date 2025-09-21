const plugin = require('tailwindcss/plugin');

module.exports = {
    content: [
        './src/**/*.{astro,html,js}',
        './src/styles/global.css',
    ],
    safelist: [
        'scanline-overlay',
        'mix-blend-screen',
        'bg-repeat',
        'pointer-events-none',
        'z-[9999]',
        'z-0',
        'opacity-10'
    ],
    theme: {
        extend: {
            fontFamily: {
                neon: ['"Press Start 2P"', 'cursive'],
            },
            colors: {
                retroPurple: '#3b0a67',
                neonGreen: '#39ff14',
                pink: '#ff00c8',
            },
            textShadow: {
                neon: '0 0 5px #39ff14, 0 0 10px #39ff14',
                pink: '0 0 5px #ff00c8, 0 0 10px #ff00c8',
            },
            keyframes: {
                jiggle: {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(2deg)' },
                    '50%': { transform: 'rotate(0deg)' },
                    '75%': { transform: 'rotate(-2deg)' },
                },
            },
            animation: {
                jiggle: 'jiggle 0.4s ease-in-out infinite',
            },
        },
    },
    plugins: [require('tailwindcss-textshadow')],
};
