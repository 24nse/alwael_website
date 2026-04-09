import Layout from "@/components/layout/Layout";
import DynamicHeroSection from "@/components/website/DynamicHeroSection";
import DynamicAboutSection from "@/components/website/DynamicAboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import DynamicProjectsSection from "@/components/website/DynamicProjectsSection";
import StatsSection from "@/components/home/StatsSection";
import TeamSection from "@/components/website/TeamSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <DynamicHeroSection />
      <DynamicAboutSection />
      <ServicesSection />
      <DynamicProjectsSection />
      <StatsSection />
      <TeamSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
