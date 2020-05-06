// ps https://github.com/GoogleChrome/puppeteer/issues/3120
module.exports = {
  headless:false,
  slowMo: process.env.SLOWMO ? process.env.SLOWMO : 0,
  devtools: true,
  launch: {
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--no-first-run',
      '--no-zygote',
      '--no-sandbox',
    ],
  },
};
