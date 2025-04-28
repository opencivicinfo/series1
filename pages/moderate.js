// /pages/moderate.js
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Moderate() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    const { data, error } = await supabase.from('replacements').select('*').eq('status', 'pending');
    if (!error) setPending(data);
  };

  const updateStatus = async (id, status) => {
    await supabase.from('replacements').update({ status }).eq('id', id);
    fetchPending();
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Moderate Submissions</h1>
      <div className="space-y-4">
        {pending.map((item) => (
          <div key={item.id} className="p-4 bg-white border rounded shadow">
            <h2 className="font-semibold">{item.original_site_name}</h2>
            <p className="text-gray-500 text-sm">Replacement: {item.replacement_name}</p>
            <div className="flex space-x-2 mt-4">
              <button onClick={() => updateStatus(item.id, 'verified')} className="px-4 py-2 bg-green-600 text-white rounded">Approve</button>
              <button onClick={() => updateStatus(item.id, 'rejected')} className="px-4 py-2 bg-red-600 text-white rounded">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
