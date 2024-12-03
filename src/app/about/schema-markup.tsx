type AboutPageSchemaMarkupProps = {
  image?: string | null;
};

export function AboutPageSchemaMarkup({ image }: AboutPageSchemaMarkupProps) {
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Person',
    name: 'Charles Harwood',
    url: 'https://charlesharwood.dev',
    image,
    sameAs: [
      'https://www.linkedin.com/in/charles-harwood-94511b38',
      'https://github.com/charles4221',
    ],
    jobTitle: 'Mobile App and Website Developer',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
