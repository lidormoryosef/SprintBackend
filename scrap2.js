// 📦 תלות: puppeteer + dotenv
const puppeteer = require("puppeteer");
const fs = require("fs");
require("dotenv").config();

// ✅ שלב 1: פונקציה לשמירת עוגייה חדשה לקובץ .env
function updateCookieInEnv(newCookie) {
  const envPath = ".env";
  let envContent = fs.readFileSync(envPath, "utf-8");
  envContent = envContent.replace(/LI_AT=.*/g, `LI_AT=${newCookie}`);
  fs.writeFileSync(envPath, envContent);
  console.log("✅ Cookie updated in .env file");
}

// ✅ שלב 2: פונקציה להשגת עוגייה חדשה מהתחברות אמיתית
async function getFreshCookie() {
  const email = process.env.LINKEDIN_EMAIL;
  const password = process.env.LINKEDIN_PASSWORD;

  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();

  await page.goto("https://www.linkedin.com/login", { waitUntil: "networkidle2" });
  await page.type("#username", email, { delay: 50 });
  await page.type("#password", password, { delay: 50 });
  await Promise.all([
    page.click("button[type=submit]"),
    page.waitForNavigation({ waitUntil: "networkidle2" })
  ]);

  const cookies = await page.cookies();
  const liAt = cookies.find(c => c.name === "li_at")?.value;

  await browser.close();

  if (!liAt) throw new Error("❌ Failed to get new li_at cookie");
  updateCookieInEnv(liAt);
  return liAt;
}

// ✅ שלב 3: פונקציית סקרייפר עם ניסיון לשחזר אם נכשל
async function scrapeLinkedIn(url) {
  let cookie = process.env.LI_AT;

  const browser = await puppeteer.launch({ headless: false, args: ["--no-sandbox"] });
  const page = await browser.newPage();

  async function setCookieAndNavigate() {
    await page.setCookie({
      name: "li_at",
      value: cookie,
      domain: ".linkedin.com",
      path: "/",
      httpOnly: true,
      secure: true
    });

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 90000
    });
  }

  try {
    await setCookieAndNavigate();
  } catch (err) {
    console.warn("⚠️ Cookie might be invalid. Refreshing...");
    await browser.close();
    cookie = await getFreshCookie();
    return scrapeLinkedIn(url); // 🔁 נסה שוב עם העוגייה החדשה
  }

  const safeText = async (selector) => {
    return await page.$eval(selector, el => el.textContent.trim()).catch(() => "unavailable");
  };

  const fullName = await safeText("h1");
  const title = await safeText(".text-body-medium.break-words");
  const location = await safeText(".text-body-small.inline.t-black--light");
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
}

// ✅ דמו להפעלה ישירה
if (require.main === module) {
  const testUrl = "https://www.linkedin.com/in/lidor-mor-yosef-476100275/";
  scrapeLinkedIn(testUrl).then(console.log).catch(console.error);
}

module.exports = scrapeLinkedIn;
