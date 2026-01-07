type JsonLdData = Record<string, unknown> & {
  "@context": "https://schema.org";
  "@type": string;
};

interface StructuredDataProps {
  data: JsonLdData;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Helper to create WebSite schema
export function createWebSiteSchema(
  url: string,
  name: string,
  description: string
): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description,
    url,
  };
}

// Helper to create Article schema for geometry detail pages
export function createArticleSchema({
  url,
  headline,
  description,
  image,
  datePublished,
  dateModified,
}: {
  url: string;
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    ...(image && { image }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    publisher: {
      "@type": "Organization",
      name: "Sacred Geometry",
      url: "https://sacredgeometry.site",
    },
  };
}

// Helper to create FAQPage schema (for Phase 2)
export function createFAQPageSchema(
  faqs: Array<{ question: string; answer: string }>
): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
