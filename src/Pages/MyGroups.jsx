import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const MyGroups = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost:5000/api/groups?creatorEmail=${userEmail}`)
        .then((res) => res.json())
        .then((data) => setGroups(data));
    }
  }, [userEmail]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this group?");
    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:5000/api/groups/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data.deletedCount > 0) {
      alert("Group deleted!");
      setGroups(groups.filter((group) => group._id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">My Groups</h2>

      {groups.length === 0 ? (
        <p className="text-center text-gray-600">You haven't created any groups yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {groups.map((group) => (
            <div key={group._id} className="bg-white shadow rounded-xl p-4 space-y-2">
              <img src={group.image} alt={group.name} className="w-full h-40 object-cover rounded" />
              <h3 className="text-xl font-semibold">{group.name}</h3>
              <p className="text-sm text-gray-600">{group.category}</p>
              <p className="text-sm">{group.description?.slice(0, 80)}...</p>
              <button
                onClick={() => handleDelete(group._id)}
                className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Cancel Group
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyGroups;
