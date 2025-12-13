import { motion, Variants } from 'framer-motion';

const MOCK = [
  { id: 1, title: 'Sui Genesis', description: 'The first collection on Sui.', imageClass: 'bg-indigo-500' },
  { id: 2, title: 'CyberPunks', description: 'A collection of 10k digital punks.', imageClass: 'bg-pink-500' },
  { id: 3, title: 'Pixel Cats', description: 'Cute pixel art for the blockchain.', imageClass: 'bg-green-500' },
  { id: 4, title: 'Metaverse Homes', description: 'Virtual real estate assets.', imageClass: 'bg-yellow-500' },
  { id: 5, title: 'Abstract Art', description: 'Generative art series 001.', imageClass: 'bg-blue-500' },
  { id: 6, title: 'Web3 Dogs', description: 'Adopt a loyal digital companion.', imageClass: 'bg-red-500' },
]; 

// Varian untuk efek Staggering (Kontainer)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
      delayChildren: 0.2, 
    },
  },
};

// Varian untuk setiap item (Kartu) - Ini hanya untuk animasi saat *masuk* (mount)
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: 'spring', 
      stiffness: 300, 
      damping: 24,
    }
  },
};

// Varian untuk animasi mengambang berulang (Floating Animation)
const floatVariants: Variants = {
    // State default 'float' yang akan kita panggil di 'animate'
    float: {
        y: [0, -2, 0], // Bergerak dari 0px ke -2px dan kembali
        transition: {
            duration: 2.5, 
            ease: "easeInOut",
            repeat: Infinity, // Ulangi tanpa batas
            repeatType: "reverse", 
        }
    }
};

export function LaunchpadList() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
    >
      {MOCK.map((item) => (
        <motion.div
          key={item.id}
          variants={itemVariants} 
          
          // 1. Panggil state 'float' dari floatVariants
          animate="float" 
          // 2. Berikan definisi floatVariants ke kartu
          custom={floatVariants} 
          
          // 3. Gabungkan whileHover dengan transisi spring
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15), 0 0 0 1px rgb(var(--accent))",
            y: -5 // Naik lebih tinggi saat di-hover
          }}
          transition={{ 
            type: "spring", 
            stiffness: 350, 
            damping: 20 
          }}
          className="card p-4 cursor-pointer"
          style={{ transformOrigin: 'center center' }}
        >
          <div 
            className={`aspect-square ${item.imageClass} rounded-lg mb-3 border border-neutral-700/50`} 
          />
          <h3 className="text-lg font-semibold truncate">{item.title}</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {item.description}
          </p>
          <div className="mt-3">
             <span className="text-xs font-medium py-1 px-2 rounded-full" style={{ backgroundColor: 'rgb(var(--accent), 0.1)', color: 'rgb(var(--accent))' }}>
                LIVE
             </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}