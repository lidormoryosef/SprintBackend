const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function scrapeLinkedInProfile(url) {
  const options = new chrome.Options();

  // כאן אתה משתמש בפרופיל הכרום שלך
  options.addArguments('--user-data-dir=/home/merya/.config/google-chrome');
  options.addArguments('--profile-directory=Default');



  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get(url);
    await driver.sleep(4000); // נותן לעמוד להיטען

    const name = await driver.findElement(By.css('h1')).getText()
    .catch(() => 'לא נמצא שם');
  
  const title = await driver.findElement(By.css('div.text-body-medium')).getText()
    .catch(() => 'לא נמצא תפקיד');
  
  const location = await driver.findElement(By.css('span.text-body-small')).getText()
    .catch(() => 'לא נמצאה מיקום');
  
    const result = {
      name,
      title,
      location,
      linkedin_url: url
    };

    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('⚠️ שגיאה במהלך הסקרייפינג:', err.message);
  } finally {
    await driver.quit();
  }
}

// כאן תכניס את הקישור לפרופיל שאתה רוצה לגרד
scrapeLinkedInProfile('https://www.linkedin.com/in/lidormoryosef/');
