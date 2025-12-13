import { WalletStatus } from './components/WalletStatus';
import { CreateLaunchpadForm } from './components/CreateLaunchpadForm';
import { LaunchpadList } from './components/LaunchpadList';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="border-b border-neutral-800 px-6 py-4">
        <h1 className="text-lg font-semibold">NFT Launchpad</h1>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        <WalletStatus />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CreateLaunchpadForm />
          <LaunchpadList />
        </div>
      </main>
    </div>
  );
}
