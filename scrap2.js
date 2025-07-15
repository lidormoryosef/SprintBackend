const puppeteer = require("puppeteer");

async function scrapeLinkedIn(url) {
  console.log("🔸 scrapeLinkedIn CALLED");

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "/usr/bin/google-chrome", // ודא שזה קיים אצלך (אולי צריך which google-chrome)
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--user-data-dir=/home/merya/.config/google-chrome", // תיקיית היוזר-דאטה הראשית
      "--profile-directory=Default" // 💥 זה מה שאתה משתמש בו לפי הפלט
    ],
  });

  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 60000
  });

  const fullName = await page.$eval("h1", el => el.innerText.trim()).catch(() => "unavailable");

  console.log("✅ full name:", fullName);

  await browser.close();
}

if (require.main === module) {
  const testUrl = "https://www.linkedin.com/in/lidor-mor-yosef-476100275/";
  scrapeLinkedIn(testUrl).catch(console.error);
}
