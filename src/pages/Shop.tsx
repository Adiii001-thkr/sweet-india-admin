import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SweetsGrid } from '@/components/sweets/SweetsGrid';
import { CategoryFilter } from '@/components/sweets/CategoryFilter';
import { useSweets } from '@/hooks/useSweets';
import { SweetCategory } from '@/types/sweet';

const Shop = () => {
  const [category, setCategory] = useState<SweetCategory | 'All'>('All');
  const { data: sweets, isLoading } = useSweets();

  const filteredSweets = category === 'All' 
    ? sweets 
    : sweets?.filter(s => s.category === category);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2">हमारी मिठाइयाँ</h1>
          <p className="text-muted-foreground">Our Sweets Collection</p>
        </div>
        <div className="mb-8">
          <CategoryFilter selected={category} onSelect={setCategory} />
        </div>
        <SweetsGrid sweets={filteredSweets} isLoading={isLoading} />
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
