import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const UpdateGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [groupData, setGroupData] = useState({
    name: '',
    creatorEmail: '',
    description: '',
  });

  const [image, setImage] = useState(null); // New state for image

  useEffect(() => {
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
    const { name, value } = e.target;
    setGroupData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user?.email !== groupData.creatorEmail) {
      alert('You are not authorized to update this group.');
      return;
    }

    try {
      let response;

      if (image) {
        // If there's an image, use FormData and /with-image route
        const formData = new FormData();
        formData.append('name', groupData.name);
        formData.append('description', groupData.description);
        formData.append('image', image);

        response = await fetch(`/api/groups/${id}/with-image`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        // No image, send JSON to normal update route
        response = await fetch(`/api/groups/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: groupData.name,
            description: groupData.description,
          }),
        });
      }

      if (response.ok) {
        alert('Group updated successfully!');
        navigate('/myGroups');
      } else {
        alert('Update failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to update group');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-8  rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Update Group</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
        <label className="flex flex-col">
          Name:
          <input
            type="text"
            name="name"
            value={groupData.name}
            onChange={handleChange}
            className="input input-bordered mt-1"
            required
          />
        </label>

        <label className="flex flex-col">
          Email:
          <input
            type="email"
            name="creatorEmail"
            value={groupData.creatorEmail}
           
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
          />
        </label>

        <label className="flex flex-col">
          Group Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered mt-1"
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
