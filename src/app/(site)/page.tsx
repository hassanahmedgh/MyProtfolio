import { getPublishedProjects } from "@/lib/data/projects";
import { getPublishedPosts } from "@/lib/data/posts";
import IntroGate from "@/components/chrome/IntroGate";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import WorkList from "@/components/site/WorkList";
import ExperiencePath from "@/components/site/ExperiencePath";
import WritingList from "@/components/site/WritingList";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { cv } from "@/content/cv";
import { getSiteUrl } from "@/lib/seo";

// Firebase web SDK reads must run on the Node runtime (not edge).
export const runtime = "nodejs";
export const revalidate = 300;

export default async function HomePage() {
  const [projects, posts] = await Promise.all([
    getPublishedProjects(),
    getPublishedPosts(),
  ]);
  const siteUrl = getSiteUrl();

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: cv.name,
    jobTitle: cv.title,
    url: siteUrl,
    email: `mailto:${cv.email}`,
    sameAs: [cv.github, cv.instagram],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    knowsAbout: Object.values(cv.skills).flat(),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Sir Syed University of Engineering & Technology (SSUET)",
    },
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${cv.name} · Portfolio`,
    url: siteUrl,
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Selected Work",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.title,
        url: p.url,
        description: p.summary,
        keywords: p.tags.join(", "),
      },
    })),
  };

  return (
    <>
      <JsonLd data={personLd} />
      <JsonLd data={websiteLd} />
      {projects.length > 0 && <JsonLd data={itemListLd} />}

      <IntroGate>
        <div className="page-bg">
          <Nav />
          <Hero />
          <About />
          <WorkList projects={projects} />
          <ExperiencePath />
          <WritingList posts={posts} />
          <Contact />
          <Footer />
        </div>
      </IntroGate>
    </>
  );
}
