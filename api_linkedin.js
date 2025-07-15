// help2.js

const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 5000;

// שלב 1 – הפנייה למסך ההרשאה של לינקדאין
app.get("/auth/linkedin", (req, res) => {
  const scope = "r_liteprofile r_emailaddress";
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&scope=${encodeURIComponent(scope)}`;
  res.redirect(authUrl);
});

// שלב 2 – לינקדאין מחזירה את הקוד, ואנחנו מחליפים אותו ל־access_token
app.get("/auth/linkedin/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: "Missing authorization code" });
  }

  try {
    // שלב 2.1 – החלפת הקוד ל־access_token
    const tokenResponse = await axios.post("https://www.linkedin.com/oauth/v2/accessToken", null, {
      params: {
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      },
    });

    const accessToken = tokenResponse.data.access_token;

    // שלב 2.2 – בקשת מידע בסיסי על המשתמש
    const profileResponse = await axios.get("https://api.linkedin.com/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // שלב 2.3 – בקשת כתובת המייל של המשתמש
    const emailResponse = await axios.get(
      "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userProfile = profileResponse.data;
    const userEmail = emailResponse.data.elements[0]["handle~"].emailAddress;

    // שלב 2.4 – שליחת המידע ללקוח
    res.json({ userProfile, userEmail });
  } catch (err) {
    console.error("❌ Error in /auth/linkedin/callback:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

// הפעלת השרת
app.listen(port, () => {
  console.log(`🔥 Server running at http://localhost:${port}`);
});
