module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#dc2626',
          dark: '#b91c1c',
        },
        secondary: {
          DEFAULT: '#ef4444',
        },
        dark: {
          bg: '#000000',
          secondary: '#0a0a0a',
          border: '#1f1f1f',
        }
      },
      boxShadow: {
        'red': '0 4px 6px -1px rgba(220, 38, 38, 0.3), 0 2px 4px -1px rgba(220, 38, 38, 0.2)',
        'red-lg': '0 20px 25px -5px rgba(220, 38, 38, 0.4), 0 10px 10px -5px rgba(220, 38, 38, 0.3)',
        'red-glow': '0 0 30px rgba(220, 38, 38, 0.5)',
      }
    },
  },
  plugins: [],
}



