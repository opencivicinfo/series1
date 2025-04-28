// /pages/browse.js
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default function Browse() {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    const { data, error } = await supabase
      .from('replacements')
      .select('*')
      .eq('status', 'verified');

    if (!error) {
      setSites(data);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Browse Verified Replacements</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {sites.map((site) => (
          <div key={site.id} className="p-4 bg-white rounded-lg border shadow">
            <h2 className="font-semibold">{site.original_site_name}</h2>
            <p className="text-gray-500 text-sm">Replacement: <a href={site.replacement_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{site.replacement_name}</a></p>
            <p className="text-xs mt-2">{site.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-sm text-gray-400">
        <Link href="/">Back Home</Link> | <Link href="/submit">Submit a Site</Link>
      </div>
    </div>
  );
}
