import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';  // <-- এখানে পরিবর্তন

const UpdateGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [groupData, setGroupData] = useState({
    name: '',
    creatorEmail: '',
    description: '',
  });

  useEffect(() => {
    // TODO: Replace with your API call to get group by id
    fetch(`/api/groups/${id}`)
      .then(res => res.json())
      .then(data => {
        setGroupData({
          name: data.name,
          creatorEmail: data.creatorEmail,
          description: data.description || '',
        });
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setGroupData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate user ownership (optional but recommended)
    if (user?.email !== groupData.creatorEmail) {
      alert('You are not authorized to update this group.');
      return;
    }

    try {
      // TODO: Replace with your API PUT/PATCH request to update group
      await fetch(`/api/groups/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: groupData.description }),
      });
      alert('Group updated successfully!');
      navigate('/myGroups');
    } catch (error) {
      console.error(error);
      alert('Failed to update group');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-8 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Update Group</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          Name (readonly):
          <input
            type="text"
            name="name"
            value={groupData.name}
            readOnly
            className="input input-bordered mt-1"
          />
        </label>

        <label className="flex flex-col">
          Email (readonly):
          <input
            type="email"
            name="creatorEmail"
            value={groupData.creatorEmail}
            readOnly
            className="input input-bordered mt-1"
          />
        </label>

        <label className="flex flex-col">
          Description:
          <textarea
            name="description"
            value={groupData.description}
            onChange={handleChange}
            className="textarea textarea-bordered mt-1"
            rows={4}
            placeholder="Update group description"
          />
        </label>

        <button type="submit" className="btn btn-primary">
          Update Group
        </button>
      </form>
    </div>
  );
};

export default UpdateGroup;
