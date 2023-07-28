/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            // '--tw-prose-body': theme('colors.text'),
            // '--tw-prose-headings': theme('colors.rose'),
            // '--tw-prose-links': theme('colors.iris'),
            // '--tw-prose-bold': theme('colors.rose'),
            // '--tw-prose-counters': theme('colors.rose'),
            // '--tw-prose-bullets': theme('colors.rose'),
            // '--tw-prose-hr': theme('colors.gold'),
            // '--tw-prose-quotes': theme('colors.foam'),
            // '--tw-prose-pre-bg': 'rgb(38 35 58)',
            // '--tw-prose-quote-borders': theme('colors.pine'),
            // '--tw-prose-captions': theme('colors.subtle'),
            // '--tw-prose-th-borders': theme('colors.muted'),
            // '--tw-prose-td-borders': theme('colors.muted'),
            h1: {
              marginTop: '1.3em',
            },
            img: {
              margin: 'auto',
              borderRadius: theme('borderRadius.lg'),
            },
            // code: {
            //   color: theme("colors.pine"),
            //   background: "rgb(38 35 58)",
            //   padding: "0.25rem 0.4rem",
            //   borderRadius: "0.25rem",
            //   fontWeight: "600",
            // },
            'code::before': {
              content: '',
            },
            'code::after': {
              content: '',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'dracula'],
  },
};
