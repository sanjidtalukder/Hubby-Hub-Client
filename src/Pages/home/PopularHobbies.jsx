const PopularHobbies = () => (
  <section className="bg-gray-50 py-12 px-6 text-center">
    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Popular Hobbies</h2>
    <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
      {['Photography', 'Gardening', 'Painting', 'Gaming', 'Cooking'].map(hobby => (
        <button
          key={hobby}
          className="bg-white rounded-lg shadow-md px-5 py-3 font-medium text-gray-700 
                     hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
          aria-label={`Explore ${hobby} hobby`}
        >
          {hobby}
        </button>
      ))}
    </div>
  </section>
);

export default PopularHobbies;
