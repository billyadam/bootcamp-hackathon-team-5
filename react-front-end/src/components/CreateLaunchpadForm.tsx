import { motion } from 'framer-motion';

export function CreateLaunchpadForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6 space-y-4"
    >
      <h2 className="font-medium">Create Collection</h2>

      <input className="input" placeholder="Image URL" />
      <input className="input" placeholder="Title" />
      <textarea className="input" placeholder="Description" />
      <input className="input" type="number" placeholder="Mint price" />
      <input className="input" type="number" placeholder="Max supply (optional)" />

      <button className="btn-primary w-full">
        Create Launchpad
      </button>
    </motion.div>
  );
}
