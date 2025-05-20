const PopularHobbies = () => (
  <section className="bg-gray-100 py-8 px-4 text-center">
    <h2 className="text-2xl font-bold mb-4">Popular Hobbies</h2>
    <div className="flex flex-wrap justify-center gap-4">
      {['Photography', 'Gardening', 'Painting', 'Gaming', 'Cooking'].map(hobby => (
        <span key={hobby} className="px-4 py-2 bg-white rounded shadow">
          {hobby}
        </span>
      ))}
    </div>
  </section>
);

export default PopularHobbies;
