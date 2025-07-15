const axios = require('axios');
const CLIENT_SECRET = 'your_client_secret';
const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/auth/linkedin/callback', async (req, res) => {
  const code = req.query.code;

  // החלפת קוד ל־access token
  const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
    params: {
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    },
  });

  const accessToken = tokenResponse.data.access_token;

  // קבלת מידע על המשתמש
  const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const emailResponse = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const userProfile = profileResponse.data;
  const userEmail = emailResponse.data.elements[0]['handle~'].emailAddress;

  // שמרי את פרטי המשתמש והמשיכי משם
    res.json({ userProfile, userEmail });
  });