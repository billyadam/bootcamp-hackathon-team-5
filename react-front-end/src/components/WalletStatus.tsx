import { useWalletKit } from '@mysten/wallet-kit';

export function WalletStatus() {
  const { currentAccount } = useWalletKit();

  if (!currentAccount) {
    return (
      <div className="card p-4">
        Wallet not connected
      </div>
    );
  }

  return (
    <div className="card p-4">
      <p className="text-sm text-neutral-400">Wallet connected</p>
      <p className="text-sm break-all">{currentAccount.address}</p>
    </div>
  );
}