import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

type Collection = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
};

export default function MintCollection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    const raw = localStorage.getItem('collections_ui');
    if (!raw) return;
    const list: Collection[] = JSON.parse(raw);
    const found = list.find((c) => c.id === id);
    if (found) setCollection(found);
  }, [id]);

  if (!collection) {
    return <div className="p-12">Collection not found</div>;
  }

  const total = Number(collection.price) * amount;

  return (
    <div className="min-h-screen px-6 py-12">

      <div className="max-w-5xl mx-auto mb-10 flex justify-between">
        <h1 className="text-xl font-semibold">Mint NFT</h1>
        <button
          onClick={() => navigate('/')}
          className="text-sm opacity-70 hover:opacity-100"
        >
          ← Back
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        <div className="card p-4">
          <div className="aspect-square rounded-xl overflow-hidden">
            <img src={collection.image} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">{collection.name}</h2>
          <p className="text-sm text-[rgb(var(--muted))]">
            {collection.description}
          </p>

          <div className="card p-5 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-[rgb(var(--muted))]">Price</span>
              <span className="font-medium">{collection.price} SUI</span>
            </div>

            <input
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="input"
            />

            <div className="flex justify-between pt-3 border-t">
              <span>Total</span>
              <span className="font-semibold">{total} SUI</span>
            </div>

            <button
              className="btn-primary w-full py-4 rounded-xl"
              onClick={() => alert('Connect this to Sui mint tx')}
            >
              Mint NFT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}