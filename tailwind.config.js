import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        smm: "640px",
      },
      keyframes: {
        pulse_color: {
          "0, 100%": {
            backgroundColor: "#1e646f",
          },
          "50%": {
            backgroundColor: "#ace4e7",
          },
        },
      },
      animation: {
        pulse_color: "pulse_color 3s ease-in-out infinite",
      },
      colors: {
        "primary": "#1e646f",
        "secondary": "#e58463",
        "optional": "#ace4e7",
        "primary-trans-10": "#1e646f10",
        "primary-trans-20": "#1e646f20",
        "primary-trans-30": "#1e646f30",
        "primary-trans-88": "#1e646f88",
        "primary-trans-aa": "#1e646faa",
        "primary-trans-bb": "#1e646fbb",
        "pform": "#e5e9ec",
        "pbg": "#ecf0f3",
      },
      boxShadow: {
        "inset-5/5": "inset 5px 5px 5px #dedfe040, inset -5px -5px 5px #ffffff",
        "inset-8/12":
          "inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9",
        "outset-vert-4/10": "4px 0px 10px #d1d9e6, -4px 0px 10px #f9f9f9",
        "outset-hor-4/10": "0px 4px 10px #d1d9e6, 0px -4px 10px #f9f9f9",
        // tailwind color palette (https://tailwindcss.com/docs/customizing-colors#customizing), 200 and 400 strong colors
        "danger-inset-2/4":
          "inset 2px 2px 4px #f87171, inset -2px -2px 4px #fecaca",
        "warning-inset-2/4":
          "inset 2px 2px 4px #facc15, inset -2px -2px 4px #fef08a",
        "success-inset-2/4":
          "inset 2px 2px 4px #4ade80, inset -2px -2px 4px #bbf7d0",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
