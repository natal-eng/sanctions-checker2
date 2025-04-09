export default async function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    const response = await fetch(`https://api.chainalysis.com/sanctions/v1/address/${address}`, {
      headers: {
        "X-API-Key": "1c36cbb4a3eebfc928866b6eed34d59d7328e8e855ac3c3aeee3a1a079dcea48",
      },
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).send(errText);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
