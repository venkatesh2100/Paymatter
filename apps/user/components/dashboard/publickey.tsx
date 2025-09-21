

export default function PublicKeyComponent({ publicKey }: { publicKey: string }) {
  return (
    <div className="p-2  items-center justify-between rounded-lg ">
      <h2 className="text-xl font-semibold mb-2">Public Key :</h2>
      <p className="break-all text-sm text-gray-700">{publicKey}</p>
    </div>
  );
}