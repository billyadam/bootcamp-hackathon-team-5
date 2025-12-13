import { motion } from 'framer-motion';
import { useState } from 'react';

// Mock collection data for display
const MOCK_COLLECTION = {
  title: 'Sui Genesis Collection',
  price: 0.5, // SUI
  supply: '500 / 1000',
};

export function MintPanel() {
  const [amount, setAmount] = useState(1);

  const totalCost = (amount * MOCK_COLLECTION.price).toFixed(2);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    if (value >= 1) {
      setAmount(value);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }} // Muncul dari skala lebih kecil
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 280, 
        damping: 25, 
        duration: 0.5 
      }}
      className="card p-8 space-y-5 max-w-sm mx-auto"
    >
      <div className="space-y-4">
        <div className="aspect-square bg-indigo-500 rounded-xl mb-3 border border-neutral-700/50" /> 

        <h2 className="font-bold text-2xl">{MOCK_COLLECTION.title}</h2>
        
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500 dark:text-neutral-400">Price per NFT:</span>
          <span className="font-medium">{MOCK_COLLECTION.price} SUI</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500 dark:text-neutral-400">Supply:</span>
          <span className="font-medium">{MOCK_COLLECTION.supply}</span>
        </div>

        <div className="pt-4 border-t border-dashed border-neutral-700/50">
          <label htmlFor="mint-amount" className="text-sm font-medium block mb-2">Quantity to Mint</label>
          <input
            id="mint-amount"
            type="number"
            min={1}
            value={amount}
            onChange={handleAmountChange}
            className="input text-center text-lg py-3"
          />
        </div>

        <div className="flex justify-between items-center pt-3 text-lg font-bold">
          <span>TOTAL COST:</span>
          <span style={{ color: 'rgb(var(--accent))' }}>{totalCost} SUI</span>
        </div>
      </div>

      {/* Mengubah button menjadi motion.button dan menambahkan whileTap */}
      <motion.button 
        whileTap={{ scale: 0.95 }} // Tombol mengecil saat diklik
        transition={{ duration: 0.1 }}
        className="btn-primary w-full"
      >
        Mint {amount} NFT(s)
      </motion.button>
    </motion.div>
  );
}