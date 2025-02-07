import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "caret-blink": {
                    "0%,70%,100%": { opacity: "1" },
                    "20%,50%": { opacity: "0" },
                },
                "spin-once": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                'fade-in-left': {
                  '0%': { opacity: '0', transform: 'translateX(-2rem)' },
                  '100%': { opacity: '1', transform: 'translateX(0)' }
                },
                'fade-in-right': {
                  '0%': { opacity: '0', transform: 'translateX(2rem)' },
                  '100%': { opacity: '1', transform: 'translateX(0)' }
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "spin-once": "spin-once 0.5s ease-in-out",
                'fade-in-left': 'fade-in-left 0.7s ease-out',
                'fade-in-right': 'fade-in-right 0.7s ease-out'
            },
            textShadow: {
                sm: '0 1px 2px rgba(0, 0, 0, 0.25)',
                md: '0 2px 4px rgba(0, 0, 0, 0.25)',
                lg: '0 4px 8px rgba(0, 0, 0, 0.25)',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
