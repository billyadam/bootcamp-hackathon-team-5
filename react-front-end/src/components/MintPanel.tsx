import { motion } from 'framer-motion';
import { useState } from 'react';

export function MintPanel() {
  const [amount, setAmount] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6 space-y-4 max-w-md mx-auto"
    >
      <div className="aspect-square bg-neutral-800 rounded" />

      <h2 className="font-medium">Mint NFT</h2>

      <input
        type="number"
        min={1}
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
        className="input"
      />

      <button className="btn-primary w-full">
        Mint
      </button>
    </motion.div>
  );
}