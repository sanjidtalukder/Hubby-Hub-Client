import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const UpdateGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState({ name: "", description: "", email: "", category: "", startDate: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://hobbyhub-server-delta.vercel.app/api/groups/${id}`)
      .then(res => res.json())
      .then(data => {
        setGroup({
          name: data.name || "",
          description: data.description || "",
          email: data.creatorEmail || "",
          category: data.category || "",
          startDate: data.startDate || "",
        });
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load group info.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setGroup(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", group.name);
    formData.append("description", group.description);
    formData.append("email", group.email);
    formData.append("category", group.category);
    formData.append("startDate", group.startDate);
    if (file) {
      formData.append("image", file);
    }

    fetch(`https://hobbyhub-server-delta.vercel.app/api/groups/${id}/with-image`, {
      method: "PUT",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success("Group updated successfully!");
          setTimeout(() => navigate("/my-groups"), 1500);
        } else {
          toast("No changes made.", { icon: "ℹ️" });
        }
      })
      .catch(() => toast.error("Failed to update group."));
  };

  if (loading) return <p className="text-center mt-10">Loading group info...</p>;

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <Toaster position="top-center" />
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">✏️ Update Group</h2>

      <form onSubmit={handleUpdate} className="space-y-5 bg-white p-6 rounded-xl shadow-lg">
        <div>
          <label className="block mb-1 font-semibold">Group Name</label>
          <input
            type="text"
            name="name"
            value={group.name}
            disabled
            className="w-full border px-4 py-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={group.description}
            onChange={handleChange}
            rows="4"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={group.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={group.startDate}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={group.email}
            disabled
            className="w-full border px-4 py-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition duration-200"
        >
          Update Group
        </button>
      </form>
    </div>
  );
};

export default UpdateGroup;
