import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { FaUsers } from 'react-icons/fa';
import { toast } from 'react-toastify'; // ✅ toast import

const GroupDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleJoinClick = (groupId, groupName) => {
    toast.success(`Your request to join "${groupName}" is approvable!`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    // Optional Navigation (if needed after toast)
    setTimeout(() => {
      navigate(`/group-details/${groupId}`);
    }, 1500);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/groups/${id}`)
      .then(res => res.json())
      .then(data => {
        setGroup(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch group:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!group) {
    return <p className="text-center mt-10 text-red-500 font-semibold">Group not found.</p>;
  }

  return (
    <Fade cascade damping={0.2}>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-blue-600 hover:underline mb-4"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back
        </button>

        <h2 className="text-3xl font-bold text-blue-800 mb-4">{group.name}</h2>

        <img
          src={group.imageUrl || 'https://i.ibb.co/2kR5zq0/default-avatar.png'}
          alt={group.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Category:</span> {group.category || 'Not specified'}
          </p>
          <p>
            <span className="font-semibold">📅 Start Date:</span>{' '}
            {group.startDate
              ? new Date(group.startDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Not provided'}
          </p>
          <div>
            <p className="font-semibold mb-1">Description:</p>
            <p className="text-gray-600">{group.description || 'No description available.'}</p>
          </div>

          <button
            onClick={() => handleJoinClick(group._id, group.name)} // ✅ Correct parameters
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            <FaUsers /> Join This Group
          </button>
        </div>
      </div>
      <br />
    </Fade>
  );
};

export default GroupDetails;
