module.exports = {
  arrowParens: "avoid",
  bracketSpacing: true,
  tabWidth: 2,
  bracketSameLine: true,
  trailingComma: "es5",
  quoteProps: "consistent",
  singleQuote: false,
  printWidth: 80,
  endOfLine: "auto",

  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tailwindAttributes: ["className"],
};
