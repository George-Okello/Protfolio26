import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  name?: string;
  keywords?: string[];
}

export default function SEO({
  title = "George Okello | Computational Neuroscientist & AI Researcher",
  description = "Portfolio of George Okello, exploring computational models that bridge artificial intelligence, network science, and cognitive neuroscience.",
  image = "https://gokello.me/og-image.jpg", // placeholder if we don't have a real one, but we could use the profile picture if there was one
  url = "https://gokello.me/",
  type = "website",
  name = "George Okello",
  keywords = ["Computational Neuroscience", "AI Researcher", "Machine Learning", "Network Science", "George Okello Ouma"]
}: SEOProps) {
  const fullTitle = title.includes(name) ? title : `${title} | ${name}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />

      {/* Open Graph tags (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={name} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />
      
      {/* Search Engine Hints */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content={name} />
    </Helmet>
  );
}
