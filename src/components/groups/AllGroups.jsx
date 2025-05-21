import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AllGroups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/groups') // ✅ API URL ঠিক রাখো
      .then(res => res.json())
      .then(data => {
        setGroups(data);
      })
      .catch(err => {
        console.error('Failed to fetch groups:', err);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Groups</h2>

      {groups.length === 0 ? (
        <p className="text-center text-gray-500">No groups found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {groups.map(group => (
            <div
              key={group._id}
              className="border border-gray-200 rounded-lg p-5 shadow-md hover:shadow-lg transition bg-white"
            >
              <img
                src={group.image || 'https://i.ibb.co/2kR5zq0/default-avatar.png'}
                alt={group.name}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold mb-1">{group.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{group.category}</p>
              <p className="text-gray-700 mb-4">
                {group.description?.slice(0, 80) || 'No description available.'}
                {group.description?.length > 80 && '...'}
              </p>
              <button
                onClick={() => navigate(`/group-details/${group._id}`)}
                className="btn btn-primary w-full"
              >
                See More
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllGroups;
