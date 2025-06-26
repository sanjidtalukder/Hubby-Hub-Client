import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import Groups from '../../Pages/home/Groups';
import Pagination from '../../components/Pagination'; // Pagination component যদি বানিয়ে থাকেন

const AllGroups = () => {
  const [groups, setGroups] = useState([]);
  const [initialGroups, setInitialGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch('https://hobbyhub-server-delta.vercel.app/api/groups');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const activeGroups = data.filter(group => {
          const groupStartDate = new Date(group.startDate);
          groupStartDate.setHours(0, 0, 0, 0);
          return groupStartDate >= today;
        });

        const firstSix = activeGroups.slice(0, 6);
        const restGroups = activeGroups.slice(6);

        setInitialGroups(firstSix);
        setGroups(restGroups);
      } catch (error) {
        console.error('Failed to fetch groups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Pagination Logic (for groups after first 6)
  const indexOfLastGroup = (currentPage - 2 + 1) * itemsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - itemsPerPage;
  const currentGroups = groups.slice(indexOfFirstGroup, indexOfLastGroup);
  const totalPages = Math.ceil(groups.length / itemsPerPage) + 1; // +1 because first page = initialGroups

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-6 mt-8 bg-white rounded-lg shadow">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-700">All Groups</h2>

      {/* First page only: Groups component and first 6 items */}
      {currentPage === 1 && (
        <>
          {/* <div className="mt-8 p-6 bg-white rounded-lg shadow">
            <Groups />
          </div> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {initialGroups.map(group => (
              <Fade key={group._id} triggerOnce>
                <div className="border border-gray-300 rounded-lg p-6 shadow hover:shadow-lg transition bg-white flex flex-col">
                  <img
                    src={group.imageUrl || 'https://i.ibb.co/2kR5zq0/default-avatar.png'}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://i.ibb.co/2kR5zq0/default-avatar.png';
                    }}
                    alt={group.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-2xl font-semibold mb-2 text-blue-800">{group.name}</h3>
                  <p className="text-sm text-gray-600 mb-1 font-medium">
                    <strong>Category: </strong> {group.category || 'Not specified'}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    <strong>Start Date:</strong> {formatDate(group.startDate)}
                  </p>
                  <button
                    onClick={() => navigate(`/group-details/${group._id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                  >
                    See More
                  </button>
                </div>
              </Fade>
            ))}
          </div>
        </>
      )}

      {/* Other pages: show groups from server */}
      {currentPage > 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {currentGroups.map(group => (
            <Fade key={group._id} triggerOnce>
              <div className="border border-gray-300 rounded-lg p-6 shadow hover:shadow-lg transition bg-white flex flex-col">
                <img
                  src={group.imageUrl || 'https://i.ibb.co/2kR5zq0/default-avatar.png'}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://i.ibb.co/2kR5zq0/default-avatar.png';
                  }}
                  alt={group.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2 text-blue-800">{group.name}</h3>
                <p className="text-sm text-gray-600 mb-1 font-medium">
                  <strong>Category: </strong> {group.category || 'Not specified'}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  <strong>Start Date:</strong> {formatDate(group.startDate)}
                </p>
                <button
                  onClick={() => navigate(`/group-details/${group._id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                >
                  See More
                </button>
              </div>
            </Fade>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12 flex-wrap">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-700 border-blue-600 hover:bg-blue-50'
              } transition`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllGroups;
