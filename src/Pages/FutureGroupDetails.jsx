import { useParams, useLocation, useNavigate } from 'react-router-dom';

const FutureGroupDetails = () => {
  const { id } = useParams();
  const { state: group } = useLocation();
  const navigate = useNavigate();

  if (!group) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-red-50 rounded-md max-w-lg mx-auto mt-20 shadow-md">
        <p className="text-red-700 font-semibold text-lg mb-4">
          ⚠️ No group data found.
        </p>
        <button
          onClick={() => navigate('/groups')}
          className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Go Back to Groups
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 sm:mt-20">
      <h2 className="text-4xl font-extrabold mb-6 text-primary leading-tight">
        {group.name}
      </h2>

      <img
        src={group.image}
        alt={group.name}
        className="w-full h-64 sm:h-96 object-cover rounded-lg shadow-md mb-6"
        loading="lazy"
      />

      <p className="text-gray-700 text-lg mb-4 leading-relaxed">
        {group.description || 'No description available for this group.'}
      </p>

      <div className="flex flex-col sm:flex-row sm:justify-between text-gray-600 text-sm sm:text-base font-medium mb-2">
        <span>
          <strong>Start Date:</strong>{' '}
          {new Date(group.startDate).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
        <span className="mt-2 sm:mt-0">
          <strong>Group ID:</strong> {id}
        </span>
      </div>

      <button
        onClick={() => navigate('/groups')}
        className="mt-6 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition font-semibold"
      >
        ← Back to Groups
      </button>
    </section>
  );
};

export default FutureGroupDetails;
