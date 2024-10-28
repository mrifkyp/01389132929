const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const webhookURL = "https://discord.com/api/webhooks/1297094586136526941/tQ2-64o2zo0m1WZj30U18EwXwfbvEUTQkjQoRsNWNU6u4OIAofXRBo9HfTYuwy8kXzlU";

// Daftar IP yang diblokir
const blockedIPs = ["44.210.150.188", "18.207.250.100"];

app.use(cors());

// Middleware untuk memblokir IP tertentu
app.use((req, res, next) => {
  const userIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if (blockedIPs.includes(userIP)) {
    return res.status(403).json({ result: "YOUR IP GOT BLACKLISTED" });
  }

  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Invalid Endpoint" });
});

app.get("/kingbypass", async (req, res) => {
  const { link } = req.query;
  const userIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if (!link) {
    return res.status(400).json({ result: "Url Needed" });
  }

  let result;

  try {
    // Handle berbagai jenis link
    if (link.startsWith("https://rekonise.com/")) {
      const response = await axios.get(
        `https://rekonise.vercel.app/rekonise?url=${encodeURIComponent(link)}`
      );
      result = response.data.key;
    } else if (link.startsWith("https://mobile.codex.lol")) {
      const response = await axios.get(
        `http://45.90.12.32:6030/api/bypass?link=${encodeURIComponent(link)}`
      );
      result = response.data.key;
    } else if (link.startsWith("https://flux.li/android/external/start.php?HWID=")) {
      const response = await axios.get(
        `https://fluxus-bypass-orcin.vercel.app/api/fluxus?link=${encodeURIComponent(link)}`
      );
      result = response.data.key;
    } else if (link.startsWith("https://trigonevo.fun/whitelist/index.php?HWID=")) {
      const response = await axios.get(
        `https://ethos.kys.gay/api/free/bypass?url=${encodeURIComponent(link)}`
      );
      result = response.data.result;
    } else if (link.startsWith("https://getkey.relzscript.xyz/redirect.php?hwid=")) {
      const response = await axios.get(
        `https://zaneru-official.vercel.app/api/bypass/relzhub?link=${encodeURIComponent(link)}&api_key=zaneru-official`
      );
      result = response.data.key;
    } else if (link.startsWith("https://nicuse.xyz/getkey")) {
      const response = await axios.get(
        `https://nicuse.vercel.app/nicuse?url=${encodeURIComponent(link)}&apikey=DemonOnTop`
      );
      result = response.data.key;
    } else if (
      link.startsWith("https://bit.ly/") ||
      link.startsWith("https://tiny.cc/") ||
      link.startsWith("https://adfoc.us/") ||
      link.startsWith("https://v.gd/") ||
      link.startsWith("https://pastefy.app/") ||
      link.startsWith("https://shorter.me/") ||
      link.startsWith("https://rentry.org/") ||
      link.startsWith("https://rentry.co/") ||
      link.startsWith("https://tinylink.onl/") ||
      link.startsWith("https://pastelink.net/") ||
      link.startsWith("https://lootdest.org/") ||
      link.startsWith("https://work.ink/") ||
      link.startsWith("https://link-center.net/") ||
      link.startsWith("https://link-target.net/") ||
      link.startsWith("https://mboost.me/") ||
      link.startsWith("https://sub2unlock.net/") ||
      link.startsWith("https://boost.ink/") ||
      link.startsWith("https://socialwolvez.com/") ||
      link.startsWith("https://unlocknow.net/") ||
      link.startsWith("https://paster.so/") ||
      link.startsWith("https://pastebin.com/") ||
      link.startsWith("https://paste-drop.com/") ||
      link.startsWith("https://workink.net/") ||
      link.startsWith("https://free-leaks.com/") ||
      link.startsWith("https://link-hub.net/") ||
      link.startsWith("https://best-links.org/") ||
      link.startsWith("https://justpaste.it/") ||
      link.startsWith("https://pastehill.com/") ||
      link.startsWith("https://loot-link.com/") ||
      link.startsWith("https://www.ytsubme.com/") ||
      link.startsWith("https://direct-link.net/") ||
      link.startsWith("https://linkvertise.com/") ||
      link.startsWith("https://sub2unlock.com/") ||
      link.startsWith("https://sub4unlock.net/") ||
      link.startsWith("https://sub4unlock.io/") ||
      link.startsWith("https://sub2unlock.io/") ||
      link.startsWith("https://sub2get.com/")
    ) {
      const response = await axios.get(
        `https://api.bypass.vip/bypass?url=${encodeURIComponent(link)}`
      );
      result = response.data.result;
    } else {
      return res.status(400).json({
        result: "Url not supported to bypass",
        credit: "Made by Dark",
      });
    }

    if (!result) {
      return res.status(500).json({ error: "Failed to bypass url" });
    }

    console.log("Success:", result);

    // Mengirim embed ke Webhook Discord
    const embed = {
      title: "Bypass Successful",
      color: 5174599,
      fields: [
        {
          name: "IP Address",
          value: userIP,
        },
        {
          name: "Original URL",
          value: link,
        },
        {
          name: "Bypass Result",
          value: result,
        },
      ],
      footer: {
        text: `📅 ${new Date().toLocaleString()}`,
      },
    };

    await axios.post(webhookURL, {
      embeds: [embed],
    });

    return res.status(200).json({ result });
    
  } catch (error) {
    console.error("Failed to bypass url:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
