const puppeteer = require("puppeteer");
require("dotenv").config();

async function scrapeLinkedIn(url) {
  const cookie = process.env.LI_AT;
  if (!cookie) {
    throw new Error("❌ Missing LI_AT cookie in .env file");
  }

  const browser = await puppeteer.launch({
    headless: false, // כדי שתוכל לראות מה קורה - שנה ל־"new" או true בפרודקשן
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  await page.setCookie({
    name: "li_at",
    value: cookie,
    domain: ".linkedin.com",
    path: "/",
    httpOnly: true,
    secure: true
  });

  try {
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 90000 // הארכת זמן
    });

    // פונקציה בטוחה להוצאת טקסט
    const safeText = async (selector) => {
      return await page.$eval(selector, el => el.textContent.trim()).catch(() => "unavailable");
    };

    // שליפת פרטים עיקריים מהפרופיל
    const fullName = await safeText("h1");
    const title = await safeText(".text-body-medium.break-words");
    const location = await safeText(".text-body-small.inline.t-black--light");

    // קבלת כל טקסט הדף
    const fullText = await page.evaluate(() => document.body.innerText);

    const extractSection = (text, regex) => {
      const match = text.match(regex);
      if (!match) return "unavailable";
      return text.slice(match.index, match.index + 500).trim();
    };

    await browser.close();

    return {
      full_name: fullName,
      current_job: title,
      location,
      linkedin_url: url,
      job_seniority: extractSection(fullText, /present|currently|current/i),
      phone: "unavailable",
      email: "unavailable",
      work_experience: extractSection(fullText, /experience/i),
      education: extractSection(fullText, /education/i),
      skills: extractSection(fullText, /skills|technologies/i),
      languages: extractSection(fullText, /languages/i),
      recommendations: extractSection(fullText, /recommendations|references/i),
      projects: extractSection(fullText, /projects/i)
    };

  } catch (err) {
    await browser.close();
    console.error("❌ Scraping error:", err.message || err);
    return {
      error: "Scraping failed",
      details: err.message || err
    };
  }
}

// להרצה עצמאית (בזמן דמו)
if (require.main === module) {
  const testUrl = "https://www.linkedin.com/in/lidor-mor-yosef-476100275/";
  scrapeLinkedIn(testUrl).then(console.log);
}

module.exports = scrapeLinkedIn;
