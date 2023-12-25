import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
      extend: {
          boxShadow: {
              'buttons': '1px 2px 2px hsl(220deg 60% 50% / 0.2),\n' +
                  '      2px 4px 4px hsl(220deg 60% 50% / 0.2),\n' +
                  '      4px 8px 8px hsl(220deg 60% 50% / 0.2),\n' +
                  '      8px 16px 16px hsl(220deg 60% 50% / 0.2),\n' +
                  '      16px 32px 32px hsl(220deg 60% 50% / 0.2);',
          },
          fontFamily: {
              satoshi: ['Satoshi', 'sans-serif'],
              inter: ['Inter', 'sans-serif'],
          },
          colors: {
              'primary-orange': '#FF5722',
          }
      },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem'
      }
    }
  },
  plugins: [
    nextui()
  ]
}
export default config