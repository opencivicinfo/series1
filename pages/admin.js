// /pages/admin.js
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (!error) setUsers(data);
  };

  const promote = async (id) => {
    await supabase.from('users').update({ role: 'moderator' }).eq('id', id);
    fetchUsers();
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Admin Panel</h1>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 bg-white border rounded shadow">
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <button onClick={() => promote(user.id)} className="mt-2 px-4 py-2 bg-blue-700 text-white rounded">Promote to Moderator</button>
          </div>
        ))}
      </div>
    </div>
  );
}
