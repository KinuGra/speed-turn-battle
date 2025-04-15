export default function Start() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-4">Speed Turn Battle</h1>
      <p className="text-lg mb-6">クイズを始めるにはスタートボタンをクリックしてください</p>
      <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
        START
      </button>
    </main>
  );
}
