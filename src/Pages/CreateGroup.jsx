import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const CreateGroup = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [group, setGroup] = useState({
    name: "",
    image: "",
    category: "",
    description: "",
    creatorEmail: "",
    startDate: "",  // <-- নতুন ফিল্ড যুক্ত করলাম
  });

  useEffect(() => {
    if (user?.email) {
      setGroup((prev) => ({
        ...prev,
        creatorEmail: user.email,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setGroup({
      ...group,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !group.name ||
      !group.image ||
      !group.category ||
      !group.creatorEmail ||
      !group.startDate // এখন startDate ও চেক করবো
    ) {
      return alert("Please fill all required fields!");
    }

    const res = await fetch("http://localhost:5000/api/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
    });

    const data = await res.json();

    if (data.insertedId || data.acknowledged) {
      alert("Group created successfully!");
      navigate("/my-groups");
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Create a New Group</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Group Name"
          value={group.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Group Image URL"
          value={group.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Art, Sports, Tech)"
          value={group.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Group Description"
          value={group.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        ></textarea>

        {/* নতুন তারিখ ইনপুট */}
        <label className="block text-gray-700 font-semibold">
          Start Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="startDate"
          value={group.startDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Create Group
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
