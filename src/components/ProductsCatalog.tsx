import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, MessageSquare, Info, X, Check, AlertCircle, ShoppingBag, ExternalLink, ShieldCheck } from 'lucide-react';
import { Product, Language, ProductCategory } from '../types';
import { translations } from '../data/translations';
import { TiltCard } from './TiltCard';

interface ProductsCatalogProps {
  products: Product[];
  language: Language;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const ProductsCatalog: React.FC<ProductsCatalogProps> = ({
  products,
  language,
  selectedCategory,
  onSelectCategory,
}) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', label: t.products.all },
    { id: 'seeds', label: t.products.seeds },
    { id: 'fertilizers', label: t.products.fertilizers },
    { id: 'pesticides', label: t.products.pesticides },
    { id: 'machinery_parts', label: t.products.machineryParts },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.nameTe && p.nameTe.toLowerCase().includes(q)) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.suitableCrops && p.suitableCrops.some((c) => c.toLowerCase().includes(q)));

      return matchesCategory && matchesQuery;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleWhatsAppInquiry = (product: Product) => {
    const text = encodeURIComponent(
      `Namaste Sri Venkateshwara Traders, I am interested in purchasing "${product.name}" (${product.unit}). Please let me know current availability and price for Madharam/Urkonda area.`
    );
    window.open(`https://wa.me/919705806070?text=${text}`, '_blank');
  };

  return (
    <section id="products" className="py-24 bg-[#F9F8F4] relative border-b border-[#1A2E22]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                {language === 'te' ? 'ధృవీకరించిన వ్యవసాయ ఉత్పత్తులు' : 'Genuine Agri-Inputs'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A2E22] tracking-tight">
              {t.products.heading}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#1A2E22]/70 font-light max-w-2xl">
              {t.products.subheading}
            </p>
          </div>

          <div className="mt-4 md:mt-0 text-xs text-[#1A2E22]/60 font-medium max-w-xs text-right hidden sm:block">
            {t.products.priceNotice}
          </div>
        </motion.div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#1A2E22]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.products.searchPlaceholder}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[#1A2E22]/15 focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20 text-sm text-[#1A2E22] outline-none shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#2D5A27] text-white shadow-md'
                    : 'bg-white border border-[#1A2E22]/15 text-[#1A2E22]/80 hover:bg-[#F9F8F4]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-[#1A2E22]/10 p-8">
            <AlertCircle className="w-12 h-12 text-[#D4AF37] mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-[#1A2E22]">No products match your search</h3>
            <p className="text-sm text-[#1A2E22]/70 font-light mt-1 max-w-md mx-auto">
              Please try different keywords or contact Sri Venkateshwara Traders directly for special stock inquiries.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#2D5A27] text-white text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, idx) => {
              const isLowStock = product.stock <= product.minStockThreshold && product.stock > 0;
              const isOutOfStock = product.stock <= 0;

              return (
                <TiltCard
                  key={product.id}
                  maxTilt={7}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="h-full bg-white rounded-2xl border border-[#1A2E22]/10 overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 flex flex-col group justify-between"
                >
                  {/* Top Image */}
                  <div className="relative h-48 bg-[#1A2E22] overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E22]/70 via-transparent to-transparent" />

                    {/* Brand Pill */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#1A2E22]/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/30">
                      {product.brand}
                    </div>

                    {/* Stock Status Badge */}
                    <div className="absolute top-3 right-3">
                      {isOutOfStock ? (
                        <span className="px-2.5 py-1 rounded-full bg-rose-600/90 text-white text-[10px] font-bold shadow uppercase tracking-wider">
                          {t.products.outOfStock}
                        </span>
                      ) : isLowStock ? (
                        <span className="px-2.5 py-1 rounded-full bg-amber-600/90 text-white text-[10px] font-bold shadow uppercase tracking-wider">
                          {t.products.lowStock}
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-[#2D5A27]/90 text-[#F9F8F4] text-[10px] font-bold shadow uppercase tracking-wider">
                          {t.products.inStock}
                        </span>
                      )}
                    </div>

                    {/* Packaging Unit Badge */}
                    <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 text-[10px] font-bold text-[#1A2E22] shadow-sm uppercase tracking-wider">
                      {product.unit}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-[#1A2E22] group-hover:text-[#2D5A27] transition-colors leading-snug">
                        {language === 'te' && product.nameTe ? product.nameTe : product.name}
                      </h3>

                      <p className="text-xs text-[#1A2E22]/70 font-light mt-2 line-clamp-2 leading-relaxed">
                        {language === 'te' && product.descriptionTe
                          ? product.descriptionTe
                          : product.description}
                      </p>

                      {/* Suitable Crops Chips */}
                      {product.suitableCrops && product.suitableCrops.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {product.suitableCrops.slice(0, 3).map((crop, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-full bg-[#F9F8F4] text-[#2D5A27] text-[10px] font-semibold border border-[#1A2E22]/10"
                            >
                              {crop}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price & Actions */}
                    <div className="mt-5 pt-4 border-t border-[#1A2E22]/5 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-[#1A2E22]/50 block font-medium uppercase tracking-wider">Indicative Price</span>
                        <span className="text-base font-serif font-bold text-[#1A2E22]">
                          ₹{product.price.toLocaleString('en-IN')}
                          <span className="text-xs text-[#1A2E22]/60 font-sans font-normal"> / {product.unit.split(' ')[0]}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="p-2 rounded-full bg-[#F9F8F4] hover:bg-[#1A2E22]/10 text-[#2D5A27] border border-[#1A2E22]/10 transition-colors cursor-pointer"
                          title={t.products.viewDetails}
                        >
                          <Info className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleWhatsAppInquiry(product)}
                          className="px-3.5 py-2 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95"
                          title="WhatsApp Inquiry"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Inquire</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#DCE5D9]"
            >
              <div className="relative h-56 bg-[#183323]">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-4 text-white">
                  <span className="px-2.5 py-1 rounded bg-[#2D6A4F] text-[11px] font-bold text-white">
                    {selectedProduct.brand}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#14291B] mb-2 font-serif-brand">
                  {selectedProduct.name}
                </h3>
                {selectedProduct.nameTe && (
                  <p className="text-sm font-semibold text-[#2D6A4F] font-telugu mb-3">
                    {selectedProduct.nameTe}
                  </p>
                )}

                <div className="p-3.5 rounded-xl bg-[#F4F7F2] border border-[#DDE6DA] space-y-2 mb-4 text-xs text-[#334E3B]">
                  <div className="flex justify-between">
                    <span className="font-semibold">Category:</span>
                    <span className="capitalize">{selectedProduct.category.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Packaging Unit:</span>
                    <span>{selectedProduct.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Availability at Madharam:</span>
                    <span className={selectedProduct.stock > 0 ? 'text-[#2D6A4F] font-bold' : 'text-rose-600 font-bold'}>
                      {selectedProduct.stock > 0 ? `${selectedProduct.stock} ${selectedProduct.unit} in stock` : 'Order on request'}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase text-[#52796F] tracking-wider mb-1">
                    Agronomic Description
                  </h4>
                  <p className="text-sm text-[#3E5244] leading-relaxed">
                    {selectedProduct.description}
                  </p>
                  {selectedProduct.descriptionTe && (
                    <p className="text-xs text-[#4A6451] font-telugu mt-2">
                      {selectedProduct.descriptionTe}
                    </p>
                  )}
                </div>

                {selectedProduct.suitableCrops && (
                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase text-[#52796F] tracking-wider mb-2">
                      Recommended Crops
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.suitableCrops.map((c, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-[#E8F0E4] text-[#1B4332] text-xs font-semibold">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-[#EEF2EA] flex gap-3">
                  <button
                    onClick={() => handleWhatsAppInquiry(selectedProduct)}
                    className="flex-1 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm flex items-center justify-center gap-2 shadow transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire on WhatsApp</span>
                  </button>

                  <a
                    href="tel:9705806070"
                    className="px-5 py-3 rounded-xl bg-[#2D6A4F] hover:bg-[#388262] text-white font-bold text-sm flex items-center justify-center gap-2"
                  >
                    <span>Call Shop</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
