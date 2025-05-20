import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const BannerSlider = () => {
  const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1600&q=80",
    title: "Meet Readers in Book Club",
    description:
      "Join like-minded readers, share book reviews, and enjoy literary discussions in our cozy book club.",
  },
 {
    image:
      "https://i.ibb.co/JjxdTgVC/fineart-restoration-AWG-events-e1683038173455-1600x705.jpg",
    title: "Join our Art Enthusiasts Group",
    description:
      "Discover, create, and collaborate with talented artists passionate about fine arts and restoration.",
  },
  {
    image: "https://i.ibb.co/Vc7MWfGF/images.jpg",
    title: "Explore Technology with Experts",
    description:
      "Dive into the latest tech trends, workshops, and talks with industry professionals and enthusiasts.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1600&q=80",
    title: "Meet Readers in Book Club",
    description:
      "Rejoin or continue your literary journey with engaging book discussions and new friendships.",
  },
  
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    title: "Join Outdoor Adventure Club",
    description:
      "Experience thrilling hikes, camping trips, and outdoor activities with fellow adventure seekers.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1600&q=80",
    title: "Get Fit with Our Yoga Sessions",
    description:
      "Relax, stretch, and strengthen your body and mind through guided yoga sessions for all levels.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
    title: "Cook & Share Culinary Delights",
    description:
      "Join cooking workshops, share recipes, and explore diverse cuisines with passionate food lovers.",
  },
];


  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDescription = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto mt-6 rounded-2xl overflow-hidden shadow-xl">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={2000}
        stopOnHover
        swipeable
        transitionTime={600}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full object-cover h-[350px] md:h-[500px]"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-4">
              <button
                onClick={() => toggleDescription(index)}
                className="flex items-center space-x-2 focus:outline-none"
                aria-expanded={expandedIndex === index}
                aria-controls={`desc-${index}`}
              >
                <h2 className="text-white text-xl md:text-4xl font-bold text-center">
                  {slide.title}
                </h2>
                <span
                  className={`text-white transform transition-transform duration-300 ${
                    expandedIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>

              {expandedIndex === index && (
                <p
                  id={`desc-${index}`}
                  className="mt-3 max-w-3xl text-center text-gray-200 text-base md:text-lg"
                >
                  {slide.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerSlider;
