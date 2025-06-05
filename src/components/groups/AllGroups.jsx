import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import Groups from '../../Pages/home/Groups';

const AllGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/groups');
        if (!res.ok) throw new Error('Network response was not ok');
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
    <div className="p-6 mt-8 bg-white rounded-lg shadow">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-700">All Groups</h2>

     
      <div className="mt-8 p-6 bg-white rounded-lg shadow">
  <Groups />
</div>


      {loading ? (
        <p className="text-center text-gray-500 text-lg mt-12">Loading groups, please wait...</p>
      ) : groups.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-12">No groups available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {groups.map(group => (
            <Fade key={group._id} triggerOnce>
              <div
                className="border border-gray-300 rounded-lg p-6 shadow hover:shadow-lg transition bg-white flex flex-col"
              >
                <img
                  src={group.imageUrl || 'https://i.ibb.co/2kR5zq0/default-avatar.png'}
                  alt={group.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">{group.name}</h3>
                <p className="text-sm text-indigo-600 mb-1 font-medium">
                  Category: {group.category || 'Not specified'}
                </p>
                <p className="text-gray-700 mb-4 flex-grow">
                  {group.description
                    ? `${group.description.slice(0, 100)}${group.description.length > 100 ? '...' : ''}`
                    : 'No description provided.'}
                </p>

                <p className="text-sm text-gray-500 mb-4">
                  <strong>Start Date:</strong> {formatDate(group.startDate)}
                </p>

                {isGroupActive(group.startDate) ? (
                  <button
                    onClick={() => navigate(`/group-details/${group._id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                  >
                    See More
                  </button>
                ) : (
                  <p className="text-red-600 font-semibold text-center">This group is no longer active</p>
                )}
              </div>
            </Fade>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllGroups;
