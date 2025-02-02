import ProxyChecker from "./components/ProxyCheck";

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <section className="max-w-3xl mx-auto my-12 space-y-12">
        <div className="text-center space-y-6 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Free Online Proxy Checker
          </h1>
          <p className="text-md max-w-2xl mx-auto text-gray-700 dark:text-gray-100">
            Instantly verify proxy servers with real-time connectivity checks.
            Validate HTTP, HTTPS & SOCKS proxies with batch processing and
            detailed latency metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <span className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                📋
              </span>
              How to Check Proxies
            </h2>
            <ol className="space-y-5">
              {[
                "Enter proxy list (one per line)",
                "Configure timeout & concurrency",
                "Real-time status updates",
                "Detailed results with latency",
              ].map((step, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 text-gray-600 dark:text-gray-300"
                >
                  <span className="flex items-center justify-center h-6 w-6 bg-blue-500 text-white rounded-full text-sm">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <span className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                ✨
              </span>
              Key Features
            </h2>
            <ul className="grid grid-cols-1 gap-4">
              {[
                "Batch proxy validation",
                "Up to 50 concurrent checks",
                "Latency measurement",
                "Auto protocol detection",
                "Instant timeout handling",
              ].map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-600 dark:text-gray-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-25 blur transition-all duration-1000 group-hover:opacity-40" />
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden mx-0 sm:mx-4">
            <ProxyChecker />
          </div>
        </div>
      </section>
    </main>
  );
}
