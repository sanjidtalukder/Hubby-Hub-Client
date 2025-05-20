import { useEffect, useState } from 'react';

const FeaturedGroups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Replace this with your real API in future
    const demoGroups = [
      {
        _id: 1,
        name: "Tech Innovators Meetup",
        description: "Join the brightest minds to explore AI, Robotics and future technology trends.",
        image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=800&q=80"
      },
      {
        _id: 2,
        name: "Art & Creativity Workshop",
        description: "Unleash your inner artist through group painting, sketching and exhibitions.",
        image: "https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?auto=format&fit=crop&w=800&q=80"
      },
      {
        _id: 3,
        name: "Adventure & Hiking Club",
        description: "Explore nature with fellow hikers. Upcoming trip: Bandarban hills!",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
      },
      {
        _id: 4,
        name: "Book Lovers Gathering",
        description: "Discuss bestsellers and classics over coffee every weekend.",
        image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80"
      },
      {
        _id: 5,
        name: "Photography Field Trip",
        description: "Capture the beauty of Dhaka city with your lens. Beginners welcome!",
        image: "https://i.ibb.co/Fqj8cQbg/images-1.jpg"
      },
      {
        _id: 6,
        name: "Cooking & Cuisine Night",
        description: "Try new dishes, share your recipe and enjoy a flavorful evening.",
        image: "https://i.ibb.co/2Ym6yhHW/images-2.jpg"
      },
    ];

    // Simulate fetch
    setTimeout(() => {
      setGroups(demoGroups);
    }, 500);
  }, []);

  return (
    <section className="px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-10">🌟 Featured Upcoming Groups</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {groups.map(group => (
          <div key={group._id} className="card bg-base-100 shadow-md w-96">
            <figure className="px-10 pt-10">
              <img
                src={group.image}
                alt={group.name}
                className="rounded-xl h-52 object-cover w-full"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-xl">{group.name}</h2>
              <p className="text-gray-600">{group.description}</p>
              <div className="card-actions mt-4">
                <button className="btn btn-primary">Join Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedGroups;
