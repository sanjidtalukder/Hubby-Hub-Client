import BannerSlider from './BannerSlider';
import FeaturedGroups from './FeaturedGroups';
import WhyJoin from './WhyJoin';
import PopularHobbies from './PopularHobbies';

const Home = () => {
  return (
    <div className="space-y-10">
      <BannerSlider />
      <FeaturedGroups />
      <WhyJoin />
      <PopularHobbies />
    </div>
  );
};

export default Home;
