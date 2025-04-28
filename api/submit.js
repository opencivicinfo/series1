// /api/submit.js
import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { original_site_name, original_url, replacement_name, replacement_url, type_of_replacement, category, description } = req.body;

  const { data, error } = await supabase.from('replacements').insert([{
    original_site_name,
    original_url,
    replacement_name,
    replacement_url,
    type_of_replacement,
    category,
    description,
    status: 'pending',
  }]);

  if (error) return res.status(400).json({ error });
  res.status(200).json({ data });
}
