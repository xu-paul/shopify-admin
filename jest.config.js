module.exports = {
  testTimeout:60000,
  preset: 'jest-puppeteer',
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: false,
    localStorage: null,
    BASE_URL:`http://localhost:${process.env.PORT || 8000}`
  },
  testMatch: [
    "**/e2e/**/*.e2e.js"
  ],
};
