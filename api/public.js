// /api/public.js
import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('replacements')
    .select('*')
    .eq('status', 'verified');

  if (error) return res.status(400).json({ error });
  res.status(200).json({ data });
}
