export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Parse JSON body safely
    let body;
    try {
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    } catch (err) {
      return res.status(400).json({ error: "Invalid JSON body", raw: req.body });
    }

    const token = process.env.META_ACCESS_TOKEN;
    if (!token) {
      return res.status(500).json({ error: "Access token missing" });
    }

    const adAccountId = "1070985436957250"; // replace with yours

    const payload = {
      name: body?.name || "Default Campaign",
      objective: body?.objective || "LINK_CLICKS",
      status: body?.status || "PAUSED",
      special_ad_categories: []
    };

    console.log("DEBUG: Payload being sent:", payload);

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

    // Return both status and full API response
    res.status(response.status).json({
      success: response.ok,
      status: response.status,
      metaResponse: data,
    });

  } catch (err) {
    console.error("ERROR in createCampaign:", err);
    res.status(500).json({
      error: "Server crashed",
      details: err.message,
      stack: err.stack,
    });
  }
}
