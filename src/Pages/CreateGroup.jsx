import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const CreateGroup = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [group, setGroup] = useState({
    name: "",
    imageUrl: "",
    category: "",
    description: "",
    creatorEmail: "",
    startDate: "",
    meetingLocation: "",
    maxMembers: "",
  });

  useEffect(() => {
    if (user?.email) {
      setGroup((prev) => ({
        ...prev,
        creatorEmail: user.email.toLowerCase(),
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

  const {
    name,
    imageUrl,
    category,
    creatorEmail,
    startDate,
    meetingLocation,
    maxMembers,
  } = group;

  if (
    !name ||
    !category ||
    !creatorEmail ||
    !startDate ||
    !meetingLocation ||
    !maxMembers
  ) {
    return toast.error("Please fill all required fields!");
  }

  // ✅ Check and set default image
  const finalGroup = {
    ...group,
    imageUrl:
      imageUrl?.trim() ||
      "https://i.ibb.co/2kR5zq0/default-avatar.png", // default fallback image
  };

  try {
    const res = await fetch(
      "https://hobbyhub-server-delta.vercel.app/api/groups",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalGroup),
      }
    );

    const data = await res.json();

    if (data.insertedId) {
      toast.success("Group created successfully!");
      navigate("/groups");
    } else {
      toast.error("Failed to create group.");
    }
  } catch (error) {
    console.error("Error creating group:", error);
    toast.error("Something went wrong.");
  }
};


  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create New Group</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={group.name}
            onChange={handleChange}
            placeholder="Group Name"
            className="input input-bordered w-full"
          />
          {/* <input
            type="text"
            name="imageUrl"
            value={group.imageUrl}
            onChange={handleChange}
            placeholder="Group Image URL"
            className="input input-bordered w-full"
          /> */}
          <input
  type="text"
  name="imageUrl"
  value={group.imageUrl}
  onChange={handleChange}
  placeholder="Group Image URL (optional)"
  className="input input-bordered w-full"
/>

          <input
            type="text"
            name="category"
            value={group.category}
            onChange={handleChange}
            placeholder="Category (e.g. Music, Reading)"
            className="input input-bordered w-full"
          />
          <textarea
            name="description"
            value={group.description}
            onChange={handleChange}
            placeholder="Group Description"
            className="textarea textarea-bordered w-full"
          ></textarea>
          <input
            type="date"
            name="startDate"
            value={group.startDate}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="meetingLocation"
            value={group.meetingLocation}
            onChange={handleChange}
            placeholder="Meeting Location"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="maxMembers"
            value={group.maxMembers}
            onChange={handleChange}
            placeholder="Maximum Members"
            className="input input-bordered w-full"
          />
          <button
            type="submit"
            className="btn btn-primary w-full uppercase font-semibold"
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
