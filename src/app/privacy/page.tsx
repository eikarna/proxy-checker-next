export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 animate-slide-up">
        Privacy Policy
        <span className="block w-20 h-2 bg-blue-600 mt-2 rounded-full" />
      </h1>

      <section className="prose dark:prose-invert space-y-8">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <span className="text-blue-500">🔒</span>
            Data Collection
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Our proxy checker does not store any personal data or proxy lists
            you submit for checking. All proxy validations are performed in
            real-time and no results are persisted on our servers.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <span className="text-blue-500">🍪</span>
            Cookies
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            We use a single cookie to remember your dark mode preference. No
            tracking cookies or third-party analytics are employed.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <span className="text-blue-500">🌐</span>
            Third-Party Services
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            The tool uses Vercel for hosting and may collect standard server
            logs as part of normal operation. These logs are automatically
            deleted after 30 days.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <span className="text-blue-500">📧</span>
            Contact
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            For any privacy-related concerns, please contact us at
            privacy@proxy-checker.com
          </p>
        </div>
      </section>
    </main>
  );
}
