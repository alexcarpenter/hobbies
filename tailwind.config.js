module.exports = {
  important: true,
  purge: {
    content: [
      "./src/**/**/*.html",
      "./src/**/**/**/*.njk",
      "./src/_data/tailwind.json"
    ],
    options: {
      whitelist: [
        "pb-1/1",
        "bg-gradient-to-br",
        "from-green-800",
        "to-green-900",
      ],
    },
  },
  theme: {
    typography: (theme) => ({
      default: {
        css: {
          color: theme("colors.gray.800"),
          lineHeight: "1.5",
          h1: {
            marginTop: "1.5em",
            marginBottom: ".5em",
            color: theme("colors.green.800"),
          },
          h2: {
            marginTop: "1.5em",
            marginBottom: ".5em",
            color: theme("colors.green.800"),
          },
          h3: {
            marginTop: "1.5em",
            marginBottom: ".5em",
            color: theme("colors.green.800"),
          },
          a: {
            color: theme("colors.green.800"),
            "&:hover": {
              color: theme("colors.green.900"),
            },
          },
          blockquote: {
            borderColor: theme("colors.green.800"),
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
    extend: {
      spacing: {
        "1/1": "100%",
        "16/9": "56.25%",
      },
      maxWidth: {
        '1/2': '50%',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  variants: {
    typography: [],
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
