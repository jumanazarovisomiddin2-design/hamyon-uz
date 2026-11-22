import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody, Inline } from "@/components/article-body";
import { articleHref, articles, getArticle } from "@/content";
import { authors, authorsLine, site } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/maqolalar/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt,
    authors: authors.map((name) => ({ name })),
    alternates: { canonical: articleHref(a) },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.excerpt,
      url: articleHref(a),
      images: [{ url: a.cover.src }],
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/maqolalar/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    inLanguage: "uz",
    image: `${site.url}${article.cover.src}`,
    author: authors.map((name) => ({ "@type": "Person", name })),
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}${articleHref(article)}`,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="page pt-8 md:pt-12">
        <div className="max-w-reading mx-auto">
          <Link href="/" className="text-small text-forest font-sans font-medium">
            ← Bosh sahifa
          </Link>
          <h1 className="text-h1 m-0 mt-6 font-serif">{article.title}</h1>
          <p className="text-small m-0 mt-5 font-sans">
            <span className="text-ink-muted">Mualliflar: </span>
            <span className="font-medium">{authorsLine}</span>
          </p>
        </div>
      </header>

      <figure className="page mt-8 md:mt-10">
        <div className="mx-auto aspect-[16/9] max-w-[64rem] overflow-hidden">
          <Image
            src={article.cover.src}
            alt={article.cover.alt}
            width={article.cover.width}
            height={article.cover.height}
            sizes="(min-width: 1100px) 1024px, 100vw"
            preload
            className="h-full w-full object-cover"
          />
        </div>
        {article.cover.credit && (
          <figcaption className="text-small text-ink-muted mx-auto mt-3 max-w-[64rem] font-sans">
            {article.cover.credit}
          </figcaption>
        )}
      </figure>

      <div className="page mt-band">
        <div className="max-w-reading mx-auto">
          <ArticleBody article={article} />

          {article.sources && (
            <section aria-labelledby="manbalar" className="border-charcoal mt-16 border-t pt-6">
              <h2 id="manbalar" className="label m-0 mb-5">
                {article.sources.heading}
              </h2>
              <ol className="text-small text-ink-soft m-0 flex flex-col gap-3 pl-5 font-sans [overflow-wrap:anywhere]">
                {article.sources.items.map((s) => (
                  <li key={s}>
                    <Inline text={s} />
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
