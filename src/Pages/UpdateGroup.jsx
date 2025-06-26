import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateGroup = () => {
  const { id } = useParams();
  const [group, setGroup] = useState({
    name: "",
    description: "",
    email: "",
    creatorEmail: "" // Ensure this is present
  });

  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    axios
      .get(`https://hobbyhub-server-delta.vercel.app/api/groups/${id}`)
      .then((res) => {
        const data = res.data;
        setGroup({
          name: data.name || "",
          description: data.description || "",
          email: data.creatorEmail || "",
          creatorEmail: data.creatorEmail || "" //  set it here
        });
      })
      .catch((err) => console.error("Error fetching group:", err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", group.name);
    formData.append("description", group.description);
    formData.append("creatorEmail", group.creatorEmail); 
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const res = await axios.patch(
        `https://hobbyhub-server-delta.vercel.app/api/groups/${id}/with-image`,
        formData
      );
      console.log("Updated successfully:", res.data);
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Update Group</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Group Name"
          value={group.name}
          onChange={(e) => setGroup({ ...group, name: e.target.value })}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={group.description}
          onChange={(e) => setGroup({ ...group, description: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Group
        </button>
      </form>
    </div>
  );
};

export default UpdateGroup;
