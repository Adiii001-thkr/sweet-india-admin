import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SweetsGrid } from '@/components/sweets/SweetsGrid';
import { CategoryFilter } from '@/components/sweets/CategoryFilter';
import { Input } from '@/components/ui/input';
import { useSearchSweets } from '@/hooks/useSweets';
import { SweetCategory } from '@/types/sweet';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<SweetCategory | 'All'>('All');
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  const { data: sweets, isLoading } = useSearchSweets(searchTerm, category, minPrice, maxPrice);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2">मिठाई खोजें</h1>
          <p className="text-muted-foreground">Search Sweets</p>
        </div>

        <div className="max-w-2xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for sweets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>

          <div className="flex gap-4">
            <Input
              type="number"
              placeholder="Min ₹"
              value={minPrice || ''}
              onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
              className="w-32"
            />
            <Input
              type="number"
              placeholder="Max ₹"
              value={maxPrice || ''}
              onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
              className="w-32"
            />
          </div>

          <CategoryFilter selected={category} onSelect={setCategory} />
        </div>

        <SweetsGrid sweets={sweets} isLoading={isLoading} />
      </main>
      <Footer />
    </div>
  );
};

export default Search;
