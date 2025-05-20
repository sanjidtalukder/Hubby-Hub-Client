import { useEffect, useState } from 'react';

const FeaturedGroups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch('https://your-server-url/groups') // Replace with your API
      .then(res => res.json())
      .then(data => setGroups(data.slice(0, 6)));
  }, []);

  return (
    <section className="px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Featured Groups</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map(group => (
          <div key={group._id} className="border rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold">{group.name}</h3>
            <p>{group.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedGroups;
