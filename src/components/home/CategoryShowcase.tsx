import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Milk-based',
    hindi: 'दूध से बनी',
    emoji: '🥛',
    description: 'Rich and creamy sweets made from pure milk and khoya',
    color: 'from-orange-100 to-orange-50',
  },
  {
    name: 'Dry-fruit',
    hindi: 'मेवे की',
    emoji: '🥜',
    description: 'Premium sweets loaded with cashews, almonds & pistachios',
    color: 'from-amber-100 to-yellow-50',
  },
  {
    name: 'Bengali',
    hindi: 'बंगाली',
    emoji: '🍮',
    description: 'Authentic Bengali sweets with cottage cheese base',
    color: 'from-rose-100 to-pink-50',
  },
  {
    name: 'Festival Special',
    hindi: 'त्योहार विशेष',
    emoji: '🪔',
    description: 'Traditional sweets perfect for celebrations & festivals',
    color: 'from-red-100 to-orange-50',
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            हमारी श्रेणियाँ
          </h2>
          <p className="text-muted-foreground text-lg">
            Our Categories - Something for every sweet tooth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`bg-gradient-to-br ${category.color} p-6 rounded-2xl border border-border shadow-soft hover:shadow-festive transition-all duration-300 cursor-pointer`}
            >
              <span className="text-5xl mb-4 block">{category.emoji}</span>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                {category.name}
              </h3>
              <p className="text-primary font-medium text-sm mb-2">{category.hindi}</p>
              <p className="text-muted-foreground text-sm">
                {category.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
