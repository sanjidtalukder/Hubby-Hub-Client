import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AllGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/groups');
        const data = await res.json();
        setGroups(data);
      } catch (error) {
        console.error('Failed to fetch groups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const isGroupActive = (startDate) => {
    if (!startDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const groupStartDate = new Date(startDate);
    groupStartDate.setHours(0, 0, 0, 0);
    return groupStartDate >= today;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Groups</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading groups...</p>
      ) : groups.length === 0 ? (
        <p className="text-center text-gray-500">No groups found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {groups.map(group => (
            <div
              key={group._id}
              className="border border-gray-200 rounded-lg p-5 shadow-md hover:shadow-lg transition bg-white"
            >
              <img
                src={group.imageUrl || 'https://i.ibb.co/2kR5zq0/default-avatar.png'}
                alt={group.name}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold mb-1">{group.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{group.category || 'No category'}</p>
              <p className="text-gray-700 mb-2">
                {group.description
                  ? `${group.description.slice(0, 80)}${group.description.length > 80 ? '...' : ''}`
                  : 'No description available.'}
              </p>

              <p className="text-sm text-gray-500 mb-4">
                <strong>Start Date:</strong> {formatDate(group.startDate)}
              </p>

              {isGroupActive(group.startDate) ? (
                <button
                  onClick={() => navigate(`/group-details/${group._id}`)}
                  className="btn btn-primary w-full"
                >
                  Join Group
                </button>
              ) : (
                <p className="text-red-500 text-center font-semibold">This group is no longer active</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllGroups;
