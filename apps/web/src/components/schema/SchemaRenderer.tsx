'use client';

import Script from 'next/script';

interface SchemaRendererProps {
  schema: any;
}

/**
 * Component to render JSON-LD structured data
 * Use this component to inject schema markup into page head
 * 
 * @example
 * <SchemaRenderer schema={buildOrganizationSchema()} />
 */
export function SchemaRenderer({ schema }: SchemaRendererProps) {
  return (
    <Script
      id={`schema-${Math.random().toString(36).substring(7)}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

/**
 * Multiple schemas renderer
 * Use when you need to inject multiple schema types on one page
 * 
 * @example
 * <MultiSchemaRenderer schemas={[
 *   buildOrganizationSchema(),
 *   buildMedicalOrganizationSchema(['Dermatology']),
 *   buildFAQPageSchema(faqs)
 * ]} />
 */
export function MultiSchemaRenderer({ schemas }: { schemas: any[] }) {
  return (
    <>
      {schemas.map((schema, index) => (
        <SchemaRenderer key={index} schema={schema} />
      ))}
    </>
  );
}
