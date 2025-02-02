import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function SocialShare() {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const text = encodeURIComponent("Check out this awesome proxy checker!");

  return (
    <div className="flex gap-3 items-center mt-6">
      <span className="text-gray-600 dark:text-gray-400">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
      >
        Twitter
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
      >
        LinkedIn
      </a>
      <button
        onClick={() => navigator.share?.({ url: shareUrl, text })}
        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
      >
        <ArrowUpTrayIcon className="h-5 w-5" />
        More
      </button>
    </div>
  );
}
