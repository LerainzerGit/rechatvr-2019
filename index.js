const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. NameServer Bootstrap
app.get('/', (req, res) => {
  const host = `https://${req.get('host')}`;
  res.json({
    Auth: host,
    API: host,
    WWW: host,
    Notifications: host,
    Images: host,
    CDN: host,
    Commerce: host,
    Matchmaking: host
  });
});

// 2. Bypass "You do not have permission to play this game"
app.get(['/api/versioncheck/v3', '/api/versioncheck/v4'], (req, res) => {
  res.json({
    VersionStatus: 0,
    UpdateNotification: ""
  });
});

// 3. Basic Config & Moderation Endpoints for 20190502
app.get('/api/config/v2', (req, res) => {
  res.json({
    MessageOfTheDay: "Welcome to ReChatVR (20190502)!",
    CdnBaseUri: `https://${req.get('host')}/`,
    MatchmakingParams: { PreferFullRoomsFrequency: 1.0 }
  });
});

app.get('/api/PlayerReporting/v1/moderationBlockDetails', (req, res) => {
  res.json({ ReportCategory: 0, Duration: 0, GameSessionId: 0, Message: "" });
});

// Log any new endpoints the 20190502 client requests so you can add them next
app.use((req, res) => {
  console.log(`[20190502 Request] ${req.method} ${req.originalUrl}`);
  res.status(200).json({});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ReChatVR 2019 server running on port ${PORT}`));
