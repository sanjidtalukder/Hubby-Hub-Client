import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const MyGroups = () => {
  const { user } = useContext(AuthContext);
  const [myGroups, setMyGroups] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const email = user.email.toLowerCase();

    fetch(`https://hobbyhub-server-delta.vercel.app/api/groups?creatorEmail=${email}`)
      .then(res => res.json())
      .then(data => setMyGroups(data))
      .catch(err => {
        console.error("Failed to load groups:", err);
        toast.error("Failed to load groups.");
      });
  }, [user]);

  const handleDelete = (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this group?");
    if (!confirmDelete) return;

    fetch(`https://hobbyhub-server-delta.vercel.app/api/groups/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          setMyGroups(prev => prev.filter(group => group._id !== id));
          toast.success("Group deleted successfully!");
        } else {
          toast.error("Failed to delete group.");
        }
      })
      .catch(() => {
        toast.error("Something went wrong.");
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-lg shadow-lg">
        🎯 My Hobby Groups
      </h2>

      {myGroups.length === 0 ? (
        <div className="text-center text-gray-500 mt-16">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No groups"
            className="w-32 mx-auto mb-4 opacity-60"
          />
          <p className="text-lg font-semibold">You haven’t created any groups yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myGroups.map(group => (
            <div
              key={group._id}
              className="border border-gray-200 rounded-xl shadow-lg p-5 bg-white hover:shadow-xl transition duration-300"
            >
              <h3 className="text-2xl font-bold text-indigo-600 mb-2">{group.name}</h3>
              <p className="text-gray-700">{group.description || "No description available."}</p>

              <div className="flex justify-end mt-4 gap-2">
                <Link to={`/update-group/${group._id}`}>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition duration-200">
                    <FaEdit /> Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(group._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition duration-200"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyGroups;
