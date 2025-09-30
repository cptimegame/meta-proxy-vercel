export default function handler(req, res) {
  const hasToken = !!process.env.META_ACCESS_TOKEN;
  res.status(200).json({ status: "ok", tokenLoaded: hasToken });
}
