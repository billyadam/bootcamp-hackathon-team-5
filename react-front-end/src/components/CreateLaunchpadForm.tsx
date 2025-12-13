import { motion } from 'framer-motion';

export function CreateLaunchpadForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Muncul dari bawah
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: 'spring', // Menggunakan spring
        stiffness: 260, 
        damping: 25, 
        duration: 0.4 
      }}
      className="card p-8 space-y-6 max-w-lg mx-auto"
    >
      <h2 className="font-bold text-2xl">Create New Collection</h2>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">Launch your NFT collection on the Sui blockchain. All fields are required unless stated otherwise.</p>

      <div className="space-y-4">
        <div>
          <label htmlFor="image-url" className="text-sm font-medium block mb-1">Image URL (for cover)</label>
          <input id="image-url" className="input" placeholder="e.g., https://myimage.com/cover.jpg" />
        </div>
        
        <div>
          <label htmlFor="title" className="text-sm font-medium block mb-1">Title</label>
          <input id="title" className="input" placeholder="e.g., My Awesome Collection" />
        </div>

        <div>
          <label htmlFor="description" className="text-sm font-medium block mb-1">Description</label>
          <textarea id="description" className="input h-24 resize-none" placeholder="A brief description of your collection." />
        </div>
        
        <div>
          <label htmlFor="mint-price" className="text-sm font-medium block mb-1">Mint Price (SUI)</label>
          <input id="mint-price" className="input" type="number" placeholder="0.5" />
        </div>
        
        <div>
          <label htmlFor="max-supply" className="text-sm font-medium block mb-1">Max Supply (optional)</label>
          <input id="max-supply" className="input" type="number" placeholder="1000" />
        </div>
      </div>

      <button className="btn-primary w-full mt-2">
        Create Launchpad
      </button>
    </motion.div>
  );
}