export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ProxyCheck - Online Proxy Validator",
    applicationCategory: "Network Utility",
    operatingSystem: "Web",
    description:
      "Free online tool to verify and test proxy servers. Check proxy status, latency and validity in real-time.",
    features: "Proxy validation, Latency testing, Batch processing",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
