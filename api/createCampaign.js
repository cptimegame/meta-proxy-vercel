export default async function handler(req, res) {
  try {
    const token = process.env.META_ACCESS_TOKEN;
    if (!token) {
      return res.status(500).json({ error: "Access token missing" });
    }

    const { name, objective, status } = req.body;

    // TODO: Replace with your real ad account ID (looks like act_1234567890)
    const adAccountId = "act_YOUR_AD_ACCOUNT_ID";

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${adAccountId}/campaigns`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          objective,
          status,
          special_ad_categories: [] // required, even if empty
        }),
      }
    );

    const data = await response.json();
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Campaign creation error:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
}
