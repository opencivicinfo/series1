import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    if (query.trim() === '') return;
    const { data, error } = await supabase
      .from('replacements')
      .select('*')
      .or(`original_site_name.ilike.%${query}%,replacement_name.ilike.%${query}%,category.ilike.%${query}%,type_of_replacement.ilike.%${query}%,description.ilike.%${query}%`)
      .eq('status', 'verified');

    if (!error) {
      setResults(data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">Open Civic Info</h1>
      <p className="text-gray-600 text-center mb-8">Preserving public knowledge before it disappears.</p>
      <div className="w-full max-w-2xl flex">
        <input
          type="text"
          className="flex-1 p-4 rounded-l-lg border border-gray-300 focus:outline-none"
          placeholder="Search for original or replacement sites..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={search} className="p-4 bg-blue-700 text-white rounded-r-lg hover:bg-blue-800">Search</button>
      </div>
      {results.length > 0 && (
        <div className="mt-8 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">Results</h2>
          <ul className="space-y-4">
            {results.map((item) => (
              <li key={item.id} className="p-4 border rounded-lg bg-white shadow">
                <p className="font-bold">{item.original_site_name}</p>
                <p className="text-sm text-gray-500">Replacement: <a href={item.replacement_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{item.replacement_name}</a></p>
                <p className="text-sm mt-2">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-10 text-sm text-gray-400">
        <Link href="/browse">Browse All Replacements</Link> | <Link href="/submit">Submit a Site</Link> | <Link href="/about">About</Link>
      </div>
    </div>
  );
}
