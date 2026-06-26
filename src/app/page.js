'use client'
import BannerSlider from "@/components/Banner";
import FeaturedProducts from "@/components/Featured_Products";
import MarketplaceStats from "@/components/Marketplace_Statistics";
import PopularCategories from "@/components/Popular_Categories";
import SuccessStories from "@/components/Success_Stories";
import SustainabilityImpact from "@/components/Sustainability";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <BannerSlider></BannerSlider>
      <FeaturedProducts></FeaturedProducts>
      <PopularCategories></PopularCategories>
      <SuccessStories></SuccessStories>
      <MarketplaceStats></MarketplaceStats>
      <SustainabilityImpact></SustainabilityImpact>
    </motion.section>
  );
}
