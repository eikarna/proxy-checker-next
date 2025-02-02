export default function FAQSection() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <h2 className="md:text-3xl font-bold mb-8 animate-slide-up text-2xl text-gray-600 dark:text-gray-300">
        Frequently Asked Questions
        <span className="block w-20 h-2 bg-blue-600 mt-2 rounded-full" />
      </h2>

      <div className="space-y-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all hover:shadow-xl">
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-3 text-gray-700 dark:text-gray-300">
            <span className="text-blue-500">❓</span>
            How many proxies can I check at once?
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            You can check up to 100 proxies simultaneously. We recommend using
            the concurrent checks setting (default 5) to balance speed and
            reliability.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all hover:shadow-xl">
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-3 text-gray-700 dark:text-gray-300">
            <span className="text-blue-500">🔌</span>
            What proxy protocols are supported?
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            We support HTTP, HTTPS, and SOCKS proxies. The tool automatically
            detects the protocol based on the proxy format.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all hover:shadow-xl">
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-3 text-gray-700 dark:text-gray-300">
            <span className="text-blue-500">💾</span>
            Are my proxy lists stored anywhere?
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            No, all checks are performed in real-time and we don't store any
            submitted proxies or results.
          </p>
        </div>
      </div>
    </main>
  );
}
