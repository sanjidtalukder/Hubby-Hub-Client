import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { FaUsers } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AuthContext } from '../providers/AuthProvider';

// 🛠 formatDate ফাংশনটি কম্পোনেন্টের বাইরে বা উপরে রাখতে হবে যাতে JSX থেকে অ্যাক্সেস করা যায়
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const GroupDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requested, setRequested] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    fetch(`https://hobbyhub-server-delta.vercel.app/api/groups/${id}`)
      .then(res => res.json())
      .then(data => {
        setGroup(data);

        const joined = data?.joinedUsers?.some(member => member.email === user?.email);
        const requestedAlready = data?.joinRequests?.some(member => member.email === user?.email);

        setRequested(joined || requestedAlready);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch group:', err);
        setLoading(false);
      });
  }, [id, user?.email]);

  const handleJoinClick = async () => {
    if (!user) {
      toast.error("Please login first to join.");
      return;
    }

    try {
      const res = await fetch(`https://hobbyhub-server-delta.vercel.app/api/groups/${id}/join-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Your join request has been sent!');
        setRequested(true);
      } else {
        toast.error(data.error || 'Failed to send join request.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while sending request.');
    }
  };

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


        {/* Avatar Group with DaisyUI */}
        <div className="avatar-group -space-x-6 mb-6">
          {requested && user && (
            <div className="avatar">
              <div className="w-12">
                <img
                  src={user.photoURL || 'https://i.ibb.co/2kR5zq0/default-avatar.png'}
                  alt={user.displayName}
                  title={user.displayName}
                />
              </div>
            </div>
          )}

          {group.joinedUsers
            ?.filter(member => member.email !== user?.email)
            .slice(0, 5)
            .map((member, index) => (
              <div key={index} className="avatar">
                <div className="w-12">
                  <img
                    src={member.photo || 'https://i.ibb.co/2kR5zq0/default-avatar.png'}
                    alt={member.name}
                    title={member.name}
                  />
                </div>
              </div>
            ))}

          {group.joinedUsers?.length > 5 && (
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-12">
                <span>+{group.joinedUsers.length - 5}</span>
              </div>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-1">{group.category || 'No category'}</p>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Start Date:</strong> {formatDate(group.startDate)}
        </p>

        <p className="mb-4 text-gray-700">{group.description}</p>

        {/* <div className="mb-4 flex items-center gap-2 shadow-2xl">
          <FaUsers className="text-blue-600" />
          <span>{group.joinedUsers?.length || 3} Members</span>
        </div> */}

        

        {/* Join Button */}
        {!requested ? (
          <button
            onClick={handleJoinClick}
            className="btn btn-primary w-full flex items-center justify-center gap-2 mt-4"
          >
            <FaUsers /> Join This Group
          </button>
        ) : (
          <button
            className="btn w-full mt-4 bg-blue-900 text-blue-700 cursor-not-allowed"
            disabled
          >
            Requested
          </button>
        )}
      </div>
    </Fade>
  );
};

export default GroupDetails;
