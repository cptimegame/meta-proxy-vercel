import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v23.0/act_1070985436957250/campaigns`,
      {
        name: req.body.name,
        objective: req.body.objective,
        status: req.body.status,
        special_ad_categories: req.body.special_ad_categories || []
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`
        }
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    res.status(400).json(err.response?.data || { error: err.message });
  }
}
