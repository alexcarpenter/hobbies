module.exports = {
  plugins: [
    require('tailwindcss')('tailwind.config.js'),
    ...(process.env.NODE_ENV === "production"
      ? [require('cssnano')]
      : []),
  ],
};