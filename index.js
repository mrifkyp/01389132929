const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const webhookURL = "https://discord.com/api/webhooks/1297094586136526941/tQ2-64o2zo0m1WZj30U18EwXwfbvEUTQkjQoRsNWNU6u4OIAofXRBo9HfTYuwy8kXzlU";

app.use(cors());
app.use(express.json()); // Enable JSON parsing

app.get("/", (req, res) => {
  res.json({ message: "Invalid Endpoint" });
});

app.get("/kingbypass", async (req, res) => {
  const { link, captcha } = req.query; // Dapatkan link dan captcha dari query
  if (!link) {
    return res.status(400).json({ result: "Url Needed" });
  }

  let result;

  try {
    // Tambahkan hCaptcha ke permintaan yang memerlukannya
    if (link.startsWith("https://rekonise.com/")) {
      const response = await axios.get(
        `https://rekonise.vercel.app/rekonise?url=${encodeURIComponent(link)}`
      );
      result = response.data.key;
    } else if (link.startsWith("https://flux.li/android/external/start.php?HWID=")) {
      const response = await axios.get(
        `https://fluxus-bypass-orcin.vercel.app/api/fluxus?link=${encodeURIComponent(link)}&captcha=${encodeURIComponent(captcha)}`
      );
      result = response.data.key;
    } else if (link.startsWith("https://trigonevo.fun/whitelist/index.php?HWID=")) {
      const response = await axios.get(
        `https://trigon.vercel.app/trigon?url=${encodeURIComponent(link)}&captcha=${encodeURIComponent(captcha)}`
      );
      result = response.data.key;
    } else if (link.startsWith("https://getkey.relzscript.xyz/redirect.php?hwid=")) {
      const response = await axios.get(
        `https://zaneru-official.vercel.app/api/bypass/relzhub?link=${encodeURIComponent(link)}&api_key=zaneru-official&captcha=${encodeURIComponent(captcha)}`
      );
      result = response.data.key;
    } else if (link.startsWith("https://nicuse.xyz/getkey")) {
      const response = await axios.get(
        `https://nicuse.vercel.app/nicuse?url=${encodeURIComponent(link)}&apikey=DemonOnTop&captcha=${encodeURIComponent(captcha)}`
      );
      result = response.data.key;
    } else if (link.startsWith("https://controlc.com/") || 
               link.startsWith("https://raw.githubusercontent.com/")) {
      const response = await axios.get(
        `https://quantum-onyx-api.vercel.app/QuantumBypass?link=${encodeURIComponent(link)}&QuantumKey=QuantumOnyxKEY-32fdahyf32y3eqe9&captcha=${encodeURIComponent(captcha)}`
      );
      result = response.data.Result; 
    } else if (link.startsWith("https://bit.ly/") || 
               link.startsWith("https://tiny.cc/") ||
               link.startsWith("https://linkvertise.com/")) {
      const response = await axios.get(
        `https://api.bypass.vip/bypass?url=${encodeURIComponent(link)}&captcha=${encodeURIComponent(captcha)}`
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

    await axios.post(webhookURL, {
      content: `Success: ${result}`,
    });

    return res.status(200).json({ result });

  } catch (error) {
    console.error("Failed to bypass url:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
