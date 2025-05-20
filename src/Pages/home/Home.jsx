import BannerSlider from './BannerSlider';
import FeaturedGroups from './FeaturedGroups';
import WhyJoin from './WhyJoin';
import PopularHobbies from './PopularHobbies';

const Home = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <BannerSlider />

      <section>
        <FeaturedGroups />
      </section>

      <section className="bg-blue-50 rounded-lg shadow-md py-10 px-6">
        <WhyJoin />
      </section>

      <section className="bg-gray-50 rounded-lg shadow-md py-10 px-6">
        <PopularHobbies />
      </section>
    </main>
  );
};

export default Home;
