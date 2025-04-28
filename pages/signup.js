// /pages/signup.js
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (!error) {
      router.push('/login');
    } else {
      alert('Signup failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-blue-700">Sign Up</h1>
        <input className="w-full p-3 border rounded" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full p-3 border rounded" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="w-full p-3 bg-blue-700 text-white rounded hover:bg-blue-800">Sign Up</button>
      </form>
    </div>
  );
}
