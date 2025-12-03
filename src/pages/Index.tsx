import { HeroSection } from '@/components/sections/HeroSection';
import { ClientMarquee } from '@/components/sections/ClientMarquee';
import { FeaturedWork } from '@/components/sections/FeaturedWork';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { WhyUsSection } from '@/components/sections/WhyUsSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { BlogPreviewSection } from '@/components/sections/BlogPreviewSection';
import { CTASection } from '@/components/sections/CTASection';

const Index = () => {
  return (
    <>
      <HeroSection />
      <ClientMarquee />
      <FeaturedWork />
      <ServicesSection />
      <WhyUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <CTASection />
    </>
  );
};

export default Index;
