export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/leads`, {
    method: "POST",
    headers: {
      "apikey": process.env.SUPABASE_KEY,
      "Content-Type": "application/json",
      "Prefer": "return=minimal",
    },
    body: JSON.stringify({ name, email, message }),
  });

  if (!response.ok) {
    return res.status(500).json({ error: "Failed to save lead" });
  }

  return res.status(200).json({ success: true });
}
