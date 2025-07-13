const puppeteer = require("puppeteer");
require("dotenv").config();

async function scrapeLinkedIn(url) {
  const cookie = process.env.LI_AT;
  if (!cookie) {
    throw new Error("❌ Missing LI_AT cookie in .env file");
  }

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.setCookie({
    name: "li_at",
    value: cookie,
    domain: ".linkedin.com",
    path: "/",
    httpOnly: true,
    secure: true,
  });

  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    const result = await page.evaluate(() => {
      const safeText = (selector) =>
        document.querySelector(selector)?.innerText.trim() || "unavailable";

      return {
        full_name: safeText("h1"),
        current_job: safeText(".text-body-medium.break-words"),
        location: safeText(".text-body-small.inline.t-black--light"),
        linkedin_url: window.location.href,
        job_seniority: "unavailable",
        phone: "unavailable",
        email: "unavailable",
        work_experience: "🛠 please extract from Experience section manually",
        education: "🎓 please extract from Education section manually",
        skills: "🧠 please extract from Skills section manually",
        languages: "🗣 please extract from Languages section manually",
        recommendations: "💬 please extract from Recommendations section manually",
        projects: "🚧 please extract from Projects section manually"
      };
    });

    console.log(result);
    await browser.close();
    return result;

  } catch (err) {
    console.error("❌ Scraping error:", err.message);
    await browser.close();
    return { error: "Scraping failed", details: err.message };
  }
}

// הרצת בדיקה
if (require.main === module) {
  const testUrl = "https://www.linkedin.com/in/lidor-mor-yosef-476100275/";
  scrapeLinkedIn(testUrl).then(console.log);
}

module.exports = scrapeLinkedIn;
