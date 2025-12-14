import { motion } from 'framer-motion';
import { useSweets } from '@/hooks/useSweets';
import { SweetCard } from '../sweets/SweetCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function FeaturedSweets() {
  const { data: sweets, isLoading } = useSweets();

  const featuredSweets = sweets?.slice(0, 4);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-4xl mb-4 block">🎊</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            लोकप्रिय मिठाइयाँ
          </h2>
          <p className="text-muted-foreground text-lg">
            Popular Sweets - Handpicked favorites loved by our customers
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSweets?.map((sweet, index) => (
              <SweetCard key={sweet.id} sweet={sweet} index={index} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/shop">
            <Button variant="default" size="lg">
              View All Sweets
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
