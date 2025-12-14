import { motion } from 'framer-motion';
import { SweetCategory } from '@/types/sweet';

const categories: (SweetCategory | 'All')[] = ['All', 'Milk-based', 'Dry-fruit', 'Bengali', 'Festival Special'];

interface CategoryFilterProps {
  selected: SweetCategory | 'All';
  onSelect: (category: SweetCategory | 'All') => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'All':
        return '🎊';
      case 'Milk-based':
        return '🥛';
      case 'Dry-fruit':
        return '🥜';
      case 'Bengali':
        return '🍮';
      case 'Festival Special':
        return '🪔';
      default:
        return '🍬';
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onSelect(category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300
            flex items-center gap-2
            ${selected === category
              ? 'bg-primary text-primary-foreground shadow-festive'
              : 'bg-card border border-border text-foreground hover:border-primary hover:text-primary'
            }
          `}
        >
          <span>{getCategoryEmoji(category)}</span>
          {category}
        </motion.button>
      ))}
    </div>
  );
}
