import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalGroups: 0,
    myGroups: 0,
    pendingGroups: 0,
  });

  useEffect(() => {
    if (user?.email) {
     axios.get(
             `https://hobbyhub-server-delta.vercel.app/api/dashboard/summary?email=${user.email.toLowerCase()}`
                )
        .then(res => {
          setStats(res.data);
        })
        .catch(err => {
          console.error('Failed to load dashboard stats:', err);
        });
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl text-primary font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl text-gray-900 font-semibold">Total Items</h2>
          <p className="text-2xl mt-2 font-bold text-blue-600">{stats.totalGroups}</p>
        </div>
        <div className="bg-white text-gray-900 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold">My Items</h2>
          <p className="text-2xl mt-2 font-bold text-green-600">{stats.myGroups}</p>
        </div>
        <div className="bg-white text-gray-900 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold">Pending</h2>
          <p className="text-2xl mt-2 font-bold text-yellow-600">{stats.pendingGroups}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl text-primary font-semibold mb-2">User Info</h2>
        <div className="bg-white text-primary p-4 rounded shadow space-y-2">
          <p><strong>Name:</strong> {user?.displayName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
