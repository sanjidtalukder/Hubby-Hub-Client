import { Users, Lightbulb, Rocket } from "lucide-react";

const WhyJoin = () => (
  <section className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 py-12 px-4 text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Join HobbyHub?</h2>
    <p className="max-w-2xl mx-auto text-gray-600 text-lg mb-10">
      Discover communities that fuel your passion. Learn, connect, and grow with people who love the same things you do.
    </p>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
      {/* Feature 1 */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition transform hover:scale-105 duration-300">
        <Users className="h-10 w-10 text-blue-600 mb-3" />
        <h3 className="text-xl font-semibold text-gray-800">Meet Like-Minded People</h3>
        <p className="text-gray-600 mt-2">
          Make friends with people who share your hobbies and interests.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition transform hover:scale-105 duration-300">
        <Lightbulb className="h-10 w-10 text-yellow-500 mb-3" />
        <h3 className="text-xl font-semibold text-gray-800">Explore New Hobbies</h3>
        <p className="text-gray-600 mt-2">
          Learn exciting new skills through group activities and expert guidance.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition transform hover:scale-105 duration-300">
        <Rocket className="h-10 w-10 text-purple-600 mb-3" />
        <h3 className="text-xl font-semibold text-gray-800">Grow with the Community</h3>
        <p className="text-gray-600 mt-2">
          Share your progress and get support from an active, passionate community.
        </p>
      </div>
    </div>
  </section>
);

export default WhyJoin;
