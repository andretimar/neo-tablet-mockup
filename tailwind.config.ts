import type { Config } from "tailwindcss";

export default {
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
      colors: {
        blue: {
          DEFAULT: '#003768',
          50: '#e6f0f7',
          100: '#cce1ef',
          200: '#99c3df',
          300: '#66a5cf',
          400: '#3387bf',
          500: '#003768',
          600: '#002c53',
          700: '#00213e',
          800: '#001629',
          900: '#000b14'
        },
        green: {
          DEFAULT: '#54b948',
          50: '#f0f9ef',
          100: '#e1f3df',
          200: '#c3e7bf',
          300: '#a5db9f',
          400: '#87cf7f',
          500: '#54b948',
          600: '#43943a',
          700: '#326f2b',
          800: '#224a1d',
          900: '#11250e'
        },
        neo: {
          header: "#1B2B3A",
          warning: "#FF0000",
          process: {
            disassembly: "#B8D7FF",
            grinding: "#90EE90",
            plating: "#FFE5A8",
            heattreat: "#FFB6B6",
            assembly: "#D3D3D3",
          },
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;