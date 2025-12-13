import { useEffect, useRef, useState } from 'react';

type Collection = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
};

export default function App() {
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

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const raw = localStorage.getItem('collections_final');
    if (raw) setCollections(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem('collections_final', JSON.stringify(collections));
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
      alert('Image, name, and price are required');
      return;
    }

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
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))] transition-colors">

      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-5 border-b">
        <h1 className="text-lg font-semibold">NFT Launchpad</h1>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-sm opacity-70 hover:opacity-100"
        >
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">

        {/* FORM + PREVIEW */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* FORM */}
          <div className="space-y-8">

            {/* UPLOAD */}
            <section className="space-y-3">
              <h2 className="text-lg font-semibold">1. Upload Artwork</h2>

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
                className={`rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition
                  ${dragActive ? 'border-[rgb(var(--accent))]' : 'border-[rgb(var(--border))]'}
                `}
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

                {image ? (
                  <p className="text-sm text-[rgb(var(--muted))]">
                    Image uploaded
                  </p>
                ) : (
                  <p className="text-sm text-[rgb(var(--muted))]">
                    Drag & drop image here or click to upload
                  </p>
                )}
              </div>
            </section>

            {/* DETAILS */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">2. Collection Details</h2>

              <input
                className="input"
                placeholder="Collection name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                className="input h-28 resize-none"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                className="input"
                placeholder="Mint price (e.g. 1 SUI)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </section>

            {/* CREATE */}
            <button
              onClick={createCollection}
              className="btn-primary w-full py-4 rounded-xl"
            >
              Create Collection
            </button>
          </div>

          {/* PREVIEW CARD */}
          <div className="card p-4 max-w-sm w-full">
            <div className="aspect-square rounded-xl overflow-hidden border mb-4 bg-black/5">
              {image ? (
                <img src={image} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-[rgb(var(--muted))]">
                  No image
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="font-semibold text-base">
                {name || 'Collection name'}
              </div>

              <div className="text-sm text-[rgb(var(--muted))] line-clamp-2">
                {description || 'Collection description'}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t flex items-center justify-between">
              <span className="text-xs text-[rgb(var(--muted))]">
                Mint price
              </span>
              <span className="font-medium">
                {price || '—'} SUI
              </span>
            </div>
          </div>
        </section>

        {/* RESULT */}
        <section className="pt-16 space-y-4">
          <h2 className="text-lg font-semibold">Your Collections</h2>

          {collections.length === 0 && (
            <p className="text-sm text-[rgb(var(--muted))]">
              No collections created yet.
            </p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {collections.map((c) => (
              <div key={c.id} className="card p-3 space-y-1">
                <div className="aspect-square rounded-lg overflow-hidden mb-2">
                  <img src={c.image} className="w-full h-full object-cover" />
                </div>

                {/* NAME */}
                <div className="font-medium text-sm">
                  {c.name}
                </div>

                {/* DESCRIPTION */}
                <div className="text-xs text-[rgb(var(--muted))] line-clamp-2">
                  {c.description}
                </div>

                {/* PRICE */}
                <div className="text-xs font-medium pt-1">
                  {c.price} SUI
                </div>
              </div>
            ))}
          </div>

        </section>

      </main>
    </div>
  );
}