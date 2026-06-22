import BannerSlider from "@/components/Banner";
import FeaturedProducts from "@/components/Featured_Products";
import MarketplaceStats from "@/components/Marketplace_Statistics";
import PopularCategories from "@/components/Popular_Categories";
import SuccessStories from "@/components/Success_Stories";
import SustainabilityImpact from "@/components/Sustainability";

export default function Home() {
  return (
    <div>
      <BannerSlider></BannerSlider>
      <FeaturedProducts></FeaturedProducts>
      <PopularCategories></PopularCategories>
      <SuccessStories></SuccessStories>
      <MarketplaceStats></MarketplaceStats>
      <SustainabilityImpact></SustainabilityImpact>
    </div>
  );
}
