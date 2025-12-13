import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

type Collection = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
};

export default function CreateCollection() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState<'dark' | 'light'>(
    () => (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  );

  const [image, setImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [collections, setCollections] = useState<Collection[]>([]);

  const fileRef = useRef<HTMLInputElement>(null);

  /* THEME */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  /* STORAGE */
  useEffect(() => {
    const raw = localStorage.getItem('collections_ui');
    if (raw) setCollections(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem('collections_ui', JSON.stringify(collections));
  }, [collections]);

  /* IMAGE */
  const loadFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  /* CREATE */
  const createCollection = () => {
    if (!image || !name || !price) {
      alert('Image, name and price are required');
      return;
    }
    console.log("sdnfsdhfiewf")
    console.log(name)

    setCollections((prev) => [
      {
        id: crypto.randomUUID(),
        name,
        description,
        image,
        price,
      },
      ...prev,
    ]);

    setImage(null);
    setName('');
    setDescription('');
    setPrice('');
  };

  return (
    <div className="min-h-screen transition-colors">

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-5 border-b border-[rgb(var(--border))]">
        <h1 className="text-xl font-semibold tracking-tight">
          NFT Launchpad
        </h1>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-sm opacity-70 hover:opacity-100 transition"
        >
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-14 space-y-20">

        {/* FORM + PREVIEW */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* FORM */}
          <div className="lg:col-span-2 space-y-10">

            {/* UPLOAD */}
            <section className="space-y-3">
              <h2 className="section-title">Upload Artwork</h2>

              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  if (e.dataTransfer.files[0]) {
                    loadFile(e.dataTransfer.files[0]);
                  }
                }}
                className={`upload-zone ${dragActive ? 'active' : ''}`}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    e.target.files && loadFile(e.target.files[0])
                  }
                />

                <p className="text-sm text-[rgb(var(--muted))]">
                  Drag & drop image or click to upload
                </p>
              </div>
            </section>

            {/* DETAILS */}
            <section className="space-y-4">
              <h2 className="section-title">Collection Details</h2>

              <input
                className="input"
                placeholder="Collection name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                className="input h-32 resize-none"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                className="input"
                placeholder="Mint price (e.g. 1.5)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </section>

            <button
              onClick={createCollection}
              className="btn-primary w-full py-4 rounded-xl"
            >
              Create Collection
            </button>
          </div>

          {/* PREVIEW CARD */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="card p-4 sticky top-24"
          >
            <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-black/5">
              {image ? (
                <img src={image} className="w-full h-full object-cover" />
              ) : (
                <div className="h-full flex items-center justify-center text-sm text-[rgb(var(--muted))]">
                  Preview
                </div>
              )}
            </div>

            <div className="font-semibold">
              {name || 'Collection name'}
            </div>
            <div className="text-sm text-[rgb(var(--muted))] mt-1">
              {description || 'Collection description'}
            </div>

            <div className="mt-4 pt-3 border-t flex justify-between text-sm">
              <span className="text-[rgb(var(--muted))]">Price</span>
              <span className="font-medium">
                {price || '—'} SUI
              </span>
            </div>
          </motion.div>
        </section>

        {/* COLLECTION LIST */}
        <section className="space-y-6">
          <h2 className="section-title">Your Collections</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {collections.map((c) => (
              <div
                key={c.id}
                onClick={() => navigate(`/mint/${c.id}`)}
                className="card p-4 cursor-pointer hover:scale-[1.02] transition"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                  <img src={c.image} className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 right-2 badge">
                    {c.price} SUI
                  </span>
                </div>

                <div className="font-medium text-sm">{c.name}</div>
                <div className="text-xs text-[rgb(var(--muted))] line-clamp-2 mt-1">
                  {c.description}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}