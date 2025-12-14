import { motion } from 'framer-motion';
import { Sweet } from '@/types/sweet';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { usePurchaseSweet } from '@/hooks/useSweets';
import { useNavigate } from 'react-router-dom';

interface SweetCardProps {
  sweet: Sweet;
  index: number;
}

export function SweetCard({ sweet, index }: SweetCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const purchaseMutation = usePurchaseSweet();
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = sweet.quantity === 0;

  const handlePurchase = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    purchaseMutation.mutate({
      sweetId: sweet.id,
      quantity,
      userId: user.id
    });
    setQuantity(1);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Milk-based':
        return 'bg-primary/10 text-primary';
      case 'Dry-fruit':
        return 'bg-gold/20 text-foreground';
      case 'Bengali':
        return 'bg-secondary/10 text-secondary';
      case 'Festival Special':
        return 'bg-accent/20 text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group bg-card rounded-xl overflow-hidden shadow-soft border border-border hover:shadow-festive transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        {sweet.image_url ? (
          <img
            src={sweet.image_url}
            alt={sweet.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-gold/20">
            <span className="text-6xl">🍬</span>
          </div>
        )}
        
        {/* Category Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(sweet.category)}`}>
          {sweet.category}
        </div>
        
        {/* Stock Badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {sweet.name}
          </h3>
          {sweet.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {sweet.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">
              ₹{sweet.price}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Package className="h-3 w-3" />
              {sweet.quantity} in stock
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isOutOfStock && (
              <>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 hover:bg-muted transition-colors rounded-l-lg"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 min-w-[40px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(sweet.quantity, quantity + 1))}
                    className="px-3 py-1 hover:bg-muted transition-colors rounded-r-lg"
                    disabled={quantity >= sweet.quantity}
                  >
                    +
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <Button
          variant={isOutOfStock ? "secondary" : "festive"}
          size="lg"
          className="w-full"
          disabled={isOutOfStock || purchaseMutation.isPending}
          onClick={handlePurchase}
        >
          {purchaseMutation.isPending ? (
            <span className="animate-pulse">Processing...</span>
          ) : isOutOfStock ? (
            'Out of Stock'
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Now - ₹{(sweet.price * quantity).toFixed(0)}
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
