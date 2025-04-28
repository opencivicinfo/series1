// /pages/submit.js
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';

export default function Submit() {
  const [form, setForm] = useState({
    original_site_name: '',
    original_url: '',
    replacement_name: '',
    replacement_url: '',
    type_of_replacement: '',
    category: '',
    description: '',
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('replacements').insert([{ ...form, status: 'pending' }]);
    if (!error) {
      router.push('/browse');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Submit a Replacement</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {['original_site_name', 'original_url', 'replacement_name', 'replacement_url', 'type_of_replacement', 'category', 'description'].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.replaceAll('_', ' ')}
            className="w-full p-3 border rounded"
            required={field !== 'original_url' && field !== 'description'}
          />
        ))}
        <button type="submit" className="w-full p-3 bg-blue-700 text-white rounded hover:bg-blue-800">Submit Replacement</button>
      </form>
    </div>
  );
}
