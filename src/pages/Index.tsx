import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { FeaturedSweets } from '@/components/home/FeaturedSweets';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedSweets />
        <CategoryShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
