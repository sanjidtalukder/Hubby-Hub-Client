import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AllGroups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Replace with your API call to fetch all groups
    fetch('/api/groups')
      .then(res => res.json())
      .then(data => setGroups(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">All Groups</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {groups.map(group => (
          <div key={group.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
            <p className="mb-4">{group.description || 'No description available.'}</p>
            <button
              onClick={() => navigate(`/group-details/${group.id}`)}
              className="btn btn-primary"
            >
              See More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllGroups;
