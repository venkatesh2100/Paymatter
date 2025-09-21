// components/LoadingPage.tsx
export default function LoadingPage() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      <p className="mt-4 text-gray-700 text-lg font-medium">Loading...</p>
    </div>
  );
}
