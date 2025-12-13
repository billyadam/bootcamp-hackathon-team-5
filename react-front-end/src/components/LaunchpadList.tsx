import { motion } from 'framer-motion';

const MOCK = [1, 2, 3]; // nanti diganti on-chain

export function LaunchpadList() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {MOCK.map((id) => (
        <motion.div
          key={id}
          whileHover={{ scale: 1.02 }}
          className="card p-4 cursor-pointer"
        >
          <div className="aspect-square bg-neutral-800 rounded mb-3" />
          <h3 className="text-sm font-medium">Collection {id}</h3>
          <p className="text-xs text-neutral-400">
            Collection description
          </p>
        </motion.div>
      ))}
    </div>
  );
}
