export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { secret, colors, active } = req.body;
  if (secret !== process.env.ADMIN_SECRET) return res.status(401).json({ error: 'Unauthorized' });

  const r = await fetch('https://sqxkecwsvbmzrkqltjsk.supabase.co/rest/v1/dice_override?id=eq.1', {
    method: 'PATCH',
    headers: {
      'apikey': process.env.SUPABASE_KEY,
      'Authorization': 'Bearer ' + process.env.SUPABASE_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ colors: JSON.stringify(colors), active: active })
  });

  res.status(r.ok ? 200 : 500).json({ ok: r.ok });
}
