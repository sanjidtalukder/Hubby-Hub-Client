import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const GroupsByCategory = () => {
  const { category } = useParams();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get(
        `https://hobbyhub-server-delta.vercel.app/api/groups?category=${encodeURIComponent(
          category
        )}`
      )
      .then((res) => setGroups(res.data))
      .catch((err) => {
        console.error("Failed to fetch groups", err);
        setError("Something went wrong while fetching groups.");
      })
      .finally(() => setLoading(false));
  }, [category]);
  console.log(category)

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-primary">
        Groups in {category}
      </h2>

      {loading ? (
        <div className="text-center text-lg text-gray-600 animate-pulse">
          Loading groups...
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : groups.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {groups.map((group) => (
            <div
              key={group._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={group.imageUrl || "https://i.ibb.co/xKqyB8qk/hobbyhub.png"}
                alt={group.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {group.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {group.description}
                </p>

                <div className="mt-4 space-y-1 text-sm text-gray-500">
                  {group.startDate && (
                    <p>
                      <strong>Start:</strong>{" "}
                      {new Date(group.startDate).toLocaleDateString()}
                    </p>
                  )}
                  {group.meetingLocation && (
                    <p>
                      <strong>Location:</strong> {group.meetingLocation}
                    </p>
                  )}
                  {group.maxMembers && (
                    <p>
                      <strong>Max Members:</strong> {group.maxMembers}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No groups found in this category.
        </p>
      )}

      <div className="mt-12 text-center">
        <Link
          to="/"
          className="inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
        >
          ← Back to Popular Hobbies
        </Link>
      </div>
    </section>
  );
};

export default GroupsByCategory;
