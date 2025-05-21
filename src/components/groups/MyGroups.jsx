import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const MyGroups = () => {
  const { user } = useContext(AuthContext);
  const [myGroups, setMyGroups] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const email = user.email.toLowerCase(); // Lowercase for consistency
    fetch(`http://localhost:5000/api/groups?creatorEmail=${email}`)
      .then(res => res.json())
      .then(data => {
        setMyGroups(data);
      })
      .catch(err => {
        console.error("Failed to load groups:", err);
      });
  }, [user]);

  const handleDelete = (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this group?");
    if (!confirmDelete) return;

    fetch(`http://localhost:5000/api/groups/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          setMyGroups(prev => prev.filter(group => group._id !== id));
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Groups</h2>
      {myGroups.length === 0 ? (
        <p>You have not created any groups yet.</p>
      ) : (
        <ul className="space-y-4">
          {myGroups.map(group => (
            <li key={group._id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{group.name}</h3>
              <p>{group.description}</p>
              <button
                onClick={() => handleDelete(group._id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyGroups;
