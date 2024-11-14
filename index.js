const express = require("express");
const axios = require("axios");
const cors = require("cors");
const timeout = require("connect-timeout"); // untuk handle timeout
const app = express();
const PORT = process.env.PORT || 3000;

const webhookURL = "https://discord.com/api/webhooks/1297094586136526941/tQ2-64o2zo0m1WZj30U18EwXwfbvEUTQkjQoRsNWNU6u4OIAofXRBo9HfTYuwy8kXzlU";

// Daftar IP yang diblokir
const blockedIPs = ["44.210.150.188", "18.207.250.100", "14.192.214.105"];

app.use(cors());
app.use(timeout("70s")); // Mengatur timeout menjadi 70 detik

// Middleware untuk memblokir IP tertentu
app.use((req, res, next) => {
  const userIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  
  // Cek apakah IP ada dalam daftar yang diblokir
  if (blockedIPs.includes(userIP)) {
    return res.status(403).json({ result: "YOUR IP GOT BLACKLISTED" });
  }

  next();
});

// Middleware untuk menangani request yang timeout
app.use((req, res, next) => {
  if (!req.timedout) next();
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
    const axiosConfig = {
      timeout: 70000, // Mengatur timeout axios menjadi 70 detik
    };

    // Penanganan berbagai jenis link
    if (link.startsWith("https://rekonise.com/")) {
      const response = await axios.get(
        `https://rekonise.vercel.app/rekonise?url=${encodeURIComponent(link)}`,
        axiosConfig
      );
      result = response.data.key;
    } else if (
      link.startsWith("https://mobile.codex.lol/") ||
      link.startsWith("https://spdmteam.com/key-system-1?hwid=") ||
      link.startsWith("https://gateway.platoboost.com/a/39097?id=") ||
      link.startsWith("https://keyguardian.org/a/161?id=")
    ) {
      const response = await axios.get(
        `https://slr.kys.gay/api/premium/bypass?url=${encodeURIComponent(link)}&apikey=SLR-FREE-PUBLIC`,
        axiosConfig
      );
      result = response.data.result;
    } else if (link.startsWith("https://flux.li/android/external/start.php?HWID=")) {
      const response = await axios.get(
        `https://fluxus-bypass-orcin.vercel.app/api/fluxus?link=${encodeURIComponent(link)}`,
        axiosConfig
      );
      result = response.data.key;
    } else if (
      link.startsWith("https://trigonevo.fun/whitelist/index.php?HWID=")) ||
      link.startsWith("https://link-hub.net/") ||
      link.startsWith("https://direct-link.net/") ||
      link.startsWith("https://link-center.net/") ||
      link.startsWith("https://link-target.net/") ||
      link.startsWith("https://linkvertise.com/") ||
      link.startsWith("https://direct-link.net/")
      {
      const response = await axios.get(
        `https://ethos.kys.gay/api/free/bypass?url=${encodeURIComponent(link)}`,
        axiosConfig
      );
      result = response.data.result;
    } else if (link.startsWith("https://getkey.relzscript.xyz/redirect.php?hwid=")) {
      const response = await axios.get(
        `https://zaneru-official.vercel.app/api/bypass/relzhub?link=${encodeURIComponent(link)}&api_key=zaneru-official`,
        axiosConfig
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
      link.startsWith("https://sub2unlock.com/") ||
      link.startsWith("https://sub4unlock.net/") ||
      link.startsWith("https://sub4unlock.io/") ||
      link.startsWith("https://sub2unlock.io/") ||
      link.startsWith("https://sub2get.com/")
    ) {
      const response = await axios.get(
        `https://api.bypass.vip/bypass?url=${encodeURIComponent(link)}`, 
        axiosConfig
      );
      result = response.data.result;
    } else if (link.startsWith("https://rkns.link/")) {
      const response = await axios.get(
        `https://ethos.kys.gay/api/free/bypass?url=${encodeURIComponent(link)}&apikey=DemonOnTop`,
        axiosConfig
      );
      result = response.data.result;
    } else if (link.startsWith("https://freenote.biz/")) {
      const response = await axios.get(
        `https://kamunanya.vercel.app/api/freenote?url=${encodeURIComponent(link)}`,
        axiosConfig
      );
      result = response.data.content;
    } else if (link.startsWith("https://esohasl.net/")) {
      const response = await axios.get(
        `https://esohl.vercel.app/api/esohasl?url=${encodeURIComponent(link)}`,
        axiosConfig
      );
      result = response.data.result
      } else if (link.startsWith("https://hastebin.skyra.pw/")) {
      const response = await axios.get(
        `https://hastebin-mu.vercel.app/api/hastebin?url=${encodeURIComponent(link)}`,
        axiosConfig
      );
      result = response.data.result
      } else if (link.startsWith("https://paste.ee/")) {
      const response = await axios.get(
        `https://huwuuehw.vercel.app/api/pasteee?url=${encodeURIComponent(link)}`,
        axiosConfig
      );
      result = response.data.result
    } else {
      return res.status(400).json({
        result: "Url not supported to bypass",
        credit: "Made by Dark",
      });
    }

    if (!result) {
      return res.status(500).json({ result: "Failed to bypass url" });
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

    await axios.post(webhookURL, { embeds: [embed] });

    return res.status(200).json({ result });

  } catch (error) {
    console.error("Failed to bypass url:", error.message);
    return res.status(500).json({ result: error.message });
  }
});

// Middleware untuk menangani permintaan yang timeout
app.use((req, res, next) => {
  if (req.timedout) {
    return res.status(503).json({ result: "Request timed out" });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
