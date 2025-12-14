import { Sweet, SweetCategory } from '@/types/sweet';
import { SweetCard } from './SweetCard';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface SweetsGridProps {
  sweets: Sweet[] | undefined;
  isLoading: boolean;
}

export function SweetsGrid({ sweets, isLoading }: SweetsGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!sweets || sweets.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20"
      >
        <span className="text-6xl mb-4 block">🍬</span>
        <h3 className="font-serif text-2xl text-foreground mb-2">No sweets found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or check back later!</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sweets.map((sweet, index) => (
        <SweetCard key={sweet.id} sweet={sweet} index={index} />
      ))}
    </div>
  );
}
