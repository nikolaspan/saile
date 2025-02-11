import type { Config } from "tailwindcss";

import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
	
  ],
  theme: {
  	extend: {
  		colors: {
  			aquaBlue: '#26BDD8',
  			deepSeaGreen: '#01181E',
  			softGray: '#D9D9D9',
  			coastalWhite: '#FAFFF9',
  			hoverBlue: '#1EA6C1',
  			activeGreen: '#013542',
  			errorRed: '#D90429',
  			successGreen: '#4CAF50',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Helvetica',
  				'Arial',
  				'sans-serif'
  			],
  			logo: [
  				'Posterama 2001 W04 Thin',
  				'sans-serif'
  			],
  			body: [
  				'Helvetica',
  				'sans-serif'
  			]
  		},
  		spacing: {
  			'72': '18rem',
  			'84': '21rem',
  			'96': '24rem'
  		},
  		boxShadow: {
  			card: '0 4px 6px rgba(0, 0, 0, 0.1)',
  			modal: '0 10px 15px rgba(0, 0, 0, 0.3)'
  		},
  		borderRadius: {
  			md: 'calc(var(--radius) - 2px)',
  			lg: 'var(--radius)',
  			xl: '1rem',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		backgroundImage: {},
  		keyframes: {
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			}
  		},
  		animation: {
  			float: 'float 3s ease-in-out infinite'
  		}
  	}
  },
  plugins: [forms, aspectRatio, ],
};

export default config;
