import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const PopularHobbies = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("https://hobbyhub-server-delta.vercel.app/api/hobbies/popular-categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch popular categories", err));
  }, []);

  // const handleClick = ()=>{
  //   Navigate(`/groups/${categories}`)
  // }
   const handleClick = (categoryId) => {
    navigate(`/groups/${categoryId}`);
  };

  return (
    <section className="bg-gray-50 py-12 px-6 text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Popular Hobbies</h2>

      {categories.length > 0 ? (
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((item, idx) => (
            <button
              key={idx}
              onClick={()=>handleClick(item._id)}
              className="bg-white rounded-lg shadow-md px-5 py-3 font-medium text-gray-700 
                         hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
              aria-label={`Explore ${item._id} hobby`}
            >
              {item._id}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Loading categories...</p>
      )}
    </section>
  );
};

export default PopularHobbies;
