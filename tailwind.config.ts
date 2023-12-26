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
              'buttons': '1px 1px 1px rgba(25, 25, 112, 0.1),\n' +
                  '      2px 2px 2px rgba(25, 25, 112, 0.1),\n' +
                  '      3px 3px 3px rgba(25, 25, 112, 0.1),\n' +
                  '      4px 4px 4px rgba(25, 25, 112, 0.1),\n' +
                  '      5px 5px 5px rgba(25, 25, 112, 0.1);',
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