import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from "react-router-dom";


const MyGroups = () => {
  const { user } = useContext(AuthContext);
  const [myGroups, setMyGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    // TODO: Replace with your API to fetch groups created by current user (maybe filter by user.email)
    fetch(`/api/groups?creatorEmail=${user.email}`)
      .then(res => res.json())
      .then(data => setMyGroups(data))
      .catch(err => console.error(err));
  }, [user]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this group?');
    if (!confirmed) return;

    try {
      // TODO: Replace with your API delete call
      await fetch(`/api/groups/${id}`, { method: 'DELETE' });
      setMyGroups(prev => prev.filter(group => group.id !== id));
      alert('Group deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete group');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">My Groups</h2>
      {myGroups.length === 0 ? (
        <p>No groups created yet.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myGroups.map(group => (
              <tr key={group.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{group.name}</td>
                <td className="border border-gray-300 px-4 py-2">{group.creatorEmail}</td>
                <td className="border border-gray-300 px-4 py-2">{group.description}</td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center">
                  <button
                    onClick={() => navigate(`/updateGroup/${group.id}`)}
                    className="btn btn-sm btn-warning"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(group.id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyGroups;
