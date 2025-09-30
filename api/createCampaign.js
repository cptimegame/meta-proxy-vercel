export default async function handler(req, res) {
  try {
    // Only allow POST
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Parse JSON safely (Vercel doesn't auto-parse req.body sometimes)
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const token = process.env.META_ACCESS_TOKEN;
    if (!token) {
      return res.status(500).json({ error: "Access token missing" });
    }

    // 🔑 IMPORTANT: replace with your real ad account ID (e.g., act_1234567890)
    const adAccountId = "act_YOUR_AD_ACCOUNT_ID";

    // Build the request payload
    const payload = {
      name: body.name || "Default Campaign",
      objective: body.objective || "LINK_CLICKS",
      status: body.status || "PAUSED",
      special_ad_categories: [] // required, even if empty
    };

    // Call Meta Marketing API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${adAccountId}/campaigns`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    // Return the raw response from Meta
    res.status(200).json({ success: true, metaResponse: data });
  } catch (err) {
    console.error("Error in createCampaign:", err);
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
}
