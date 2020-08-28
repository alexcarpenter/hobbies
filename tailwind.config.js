module.exports = {
  important: true,
  purge: {
    content: ["./src/**/**/*.html", "./src/**/**/**/*.njk"],
    options: {
      whitelist: [
        "pb-1/1",
        "bg-gradient-to-br",
        "from-green-700",
        "to-green-900",
      ],
    },
  },
  theme: {
    typography: (theme) => ({
      default: {
        css: {
          color: theme("colors.gray-900"),
          lineHeight: "1.5",
          h1: {
            color: theme("colors.green-700"),
          },
          a: {
            color: theme("colors.green-700"),
            "&:hover": {
              color: theme("colors.green-900"),
            },
          },
          blockquote: {
            borderColor: theme("colors.green-700"),
            fontStyle: "normal",
            fontWeight: "400",
          },
          li: {
            marginTop: "0.25rem",
            marginBottom: "0.25rem",
          },
        },
      },
    }),
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    colors: {
      "green-700": "#005737",
      "green-900": "#003d27",
      "blue-700": "#072e64",
      "orange-700": "#b14e2b",
      "gray-100": "#F8F9F9",
      "gray-200": "#EEEEEE",
      "gray-300": "#C3C5C5",
      "gray-400": "#A8ABAB",
      "gray-500": "#8E9191",
      "gray-600": "#737778",
      "gray-700": "#585C5E",
      "gray-800": "#3E4244",
      "gray-900": "#23272A",
      white: "#FFFFFF",
      black: "#000000",
    },
    extend: {
      spacing: {
        "1/1": "100%",
        "16/9": "56.25%",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  variants: {
    typography: [],
  },
};