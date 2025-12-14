import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🪔</span>
              <div>
                <h3 className="font-serif text-xl font-bold">मिठाई घर</h3>
                <p className="text-xs text-secondary-foreground/70">Mithai Ghar</p>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground/80">
              Authentic Indian sweets made with love and tradition since 1985.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="hover:text-gold transition-colors">
                  Shop Sweets
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-gold transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-gold transition-colors">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span>🥛</span> Milk-based
              </li>
              <li className="flex items-center gap-2">
                <span>🥜</span> Dry-fruit
              </li>
              <li className="flex items-center gap-2">
                <span>🍮</span> Bengali
              </li>
              <li className="flex items-center gap-2">
                <span>🪔</span> Festival Special
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>📍 12112 Kharar, Punjab, India</li>
              <li>📞 +91 98765 000000</li>
              <li>✉️ namastemithaigharrr@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm text-secondary-foreground/70">
          <p>© 2025 Mithai Ghar. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
