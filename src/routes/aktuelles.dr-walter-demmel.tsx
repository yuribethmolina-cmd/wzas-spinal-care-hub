import { createFileRoute, Link } from "@tanstack/react-router";
import drDemmelTreatmentImg from "@/assets/wzas/hp-demmel.jpg.asset.json";
import { SiteNav } from "@/components/SiteNav";
import { PageFooter } from "@/components/wzas/PageFooter";
import { useLang, useT } from "@/lib/lang";

const BOOKING_URL = "/#termin";

export const Route = createFileRoute("/aktuelles/dr-walter-demmel")({
  head: () => ({
    meta: [
      { title: "Dr. Walter Demmel verstärkt das WZAS · Aktuelles" },
      {
        name: "description",
        content: "Dr. Walter Demmel erweitert das WZAS mit seiner langjährigen Expertise in Schmerztherapie und Neuromodulation.",
      },
      { property: "og:title", content: "Dr. Walter Demmel verstärkt das WZAS" },
      {
        property: "og:description",
        content: "Spezialisierte Schmerztherapie und Neuromodulation im Wirbelsäulenzentrum am Stiglmaierplatz.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WalterDemmelArticle,
});

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="mt-0.5 size-5 shrink-0" aria-hidden="true">
      <path d="m4 10 3.5 3.5L16 5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WalterDemmelArticle() {
  const { lang } = useLang();
  const t = useT({
    de: {
      back: "Zurück zu Aktuelles",
      category: "Pressemitteilung",
      date: "Juni 2026",
      title: "Dr. Walter Demmel: Einer der führenden Spezialisten für Schmerztherapie Deutschlands verstärkt das WZAS",
      intro: "Mit Dr. (Univ. Ferrara) Walter Demmel verstärkt einer der führenden Spezialisten für Schmerztherapie und Neuromodulation in Deutschland das Wirbelsäulenzentrum am Stiglmaierplatz. Unsere Patienten mit chronischen Rücken-, Nerven- oder Schmerzsyndromen profitieren damit von einer außergewöhnlichen Expertise, die über Jahrzehnte hinweg in renommierten neurochirurgischen und schmerzmedizinischen Einrichtungen aufgebaut wurde.",
      paragraphs: [
        "Dr. Demmel ist Facharzt für Neurochirurgie und beschäftigt sich seit vielen Jahren intensiv mit der Behandlung chronischer Schmerzen. Sein Schwerpunkt liegt auf modernen Verfahren der Neuromodulation. Dabei werden gezielt elektrische Impulse eingesetzt, um die Weiterleitung und Verarbeitung von Schmerzsignalen im Nervensystem zu beeinflussen. Für viele Betroffene können solche Verfahren eine wichtige Behandlungsoption sein, wenn Medikamente, Physiotherapie oder andere konservative Maßnahmen nicht den gewünschten Erfolg bringen.",
        "Im Laufe seiner beruflichen Tätigkeit war Dr. Demmel unter anderem als Oberarzt, Chefarzt und Leiter spezialisierter Einrichtungen für Neurochirurgie und Schmerztherapie tätig. Er gilt als ausgewiesener Experte für die Behandlung chronischer Schmerzen und verfügt insbesondere auf dem Gebiet der Neuromodulation über einen großen Erfahrungsschatz.",
        "Im Wirbelsäulenzentrum am Stiglmaierplatz ergänzt Dr. Demmel das bestehende interdisziplinäre Team aus Neurochirurgie, Orthopädie und Radiologie. Dadurch können Patientinnen und Patienten von kurzen Wegen, einer engen Zusammenarbeit der Fachbereiche und einer individuell abgestimmten Behandlung profitieren.",
      ],
      focusTitle: "Behandlungsschwerpunkte",
      focus: [
        "Chronische Rückenschmerzen",
        "Nervenschmerzen und neuropathische Schmerzen",
        "Schmerztherapie und Neuromodulation",
        "Rückenmarkstimulation (Spinal Cord Stimulation)",
        "Dorsal-Root-Ganglion-Stimulation (DRG-Stimulation)",
        "Periphere Nervenstimulation",
        "Schmerzen nach Wirbelsäulenoperationen",
        "Komplexe chronische Schmerzsyndrome",
      ],
      closing: "Wir freuen uns sehr, einen der erfahrensten Spezialisten seines Fachgebiets für das Wirbelsäulenzentrum am Stiglmaierplatz gewonnen zu haben und unseren Patientinnen und Patienten damit eine weitere hochspezialisierte Behandlungsoption anbieten zu können.",
      profile: "Zum Profil von Dr. Demmel",
      appointment: "Termin buchen",
      imageAlt: "Dr. Walter Demmel bei einer bildgesteuerten Schmerzbehandlung",
    },
    en: {
      back: "Back to latest news",
      category: "Press release",
      date: "June 2026",
      title: "Dr Walter Demmel: One of Germany’s leading pain medicine specialists joins WZAS",
      intro: "Dr Walter Demmel, a leading specialist in pain medicine and neuromodulation in Germany, has joined the Spine Center at Stiglmaierplatz. Patients with chronic back pain, nerve pain or complex pain syndromes now benefit from expertise developed over decades at renowned neurosurgical and pain medicine institutions.",
      paragraphs: [
        "Dr Demmel is a neurosurgeon who has focused intensively on the treatment of chronic pain for many years. His particular interest is modern neuromodulation. These techniques use targeted electrical impulses to influence how pain signals are transmitted and processed in the nervous system. They can offer an important treatment option when medication, physiotherapy or other conservative measures have not achieved the desired result.",
        "Throughout his career, Dr Demmel has worked as a senior physician, chief physician and director of specialist neurosurgery and pain medicine units. He is a recognised expert in chronic pain and has extensive experience, particularly in neuromodulation.",
        "At the Spine Center at Stiglmaierplatz, Dr Demmel complements the existing interdisciplinary team of neurosurgery, orthopaedics and radiology. Patients benefit from close collaboration between specialties, short pathways and treatment tailored to their individual needs.",
      ],
      focusTitle: "Areas of treatment",
      focus: [
        "Chronic back pain",
        "Nerve pain and neuropathic pain",
        "Pain medicine and neuromodulation",
        "Spinal cord stimulation",
        "Dorsal root ganglion stimulation (DRG stimulation)",
        "Peripheral nerve stimulation",
        "Pain after spinal surgery",
        "Complex chronic pain syndromes",
      ],
      closing: "We are delighted to welcome one of the most experienced specialists in his field to the Spine Center at Stiglmaierplatz and to offer our patients another highly specialised treatment option.",
      profile: "View Dr Demmel’s profile",
      appointment: "Book an appointment",
      imageAlt: "Dr Walter Demmel performing an image-guided pain treatment",
    },
  });

  return (
    <div className="min-h-screen bg-[#F9F8F4]">
      <SiteNav />
      <main>
        <article>
          <header className="bg-[#212121] text-white">
            <div className="mx-auto max-w-[1440px] px-5 pb-12 pt-7 lg:px-8 lg:pb-20 lg:pt-10">
              <Link to="/aktuelles" className="inline-flex min-h-11 items-center text-sm font-medium text-[#DDD0B0] transition-colors hover:text-white">
                <span aria-hidden="true">←</span>
                <span className="ml-2">{t.back}</span>
              </Link>
              <div className="mt-7 max-w-5xl">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase text-[#DDD0B0]">
                  <span>{t.category}</span>
                  <span className="size-1 rounded-full bg-[#AC8F52]" aria-hidden="true" />
                  <time>{t.date}</time>
                </div>
                <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-[1.15] sm:text-5xl lg:text-6xl">{t.title}</h1>
                <p className="mt-7 max-w-3xl text-base leading-7 text-[#E6E3DC] sm:text-lg sm:leading-8">{t.intro}</p>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1440px] px-5 py-10 lg:px-8 lg:py-16">
            <figure className="overflow-hidden rounded-[10px] bg-[#E6E3DC]">
              <img src={drDemmelTreatmentImg.url} alt={t.imageAlt} className="aspect-[4/3] w-full object-cover sm:aspect-[16/9] lg:aspect-[2/1]" />
            </figure>

            <div className="mx-auto mt-10 grid max-w-6xl gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
              <div className="space-y-6 text-base leading-8 text-[#333333]">
                {t.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <p className="border-l-2 border-[#AC8F52] pl-5 text-lg font-medium leading-8 text-[#212121]">{t.closing}</p>
              </div>

              <aside className="self-start rounded-[10px] border border-[#DDD0B0] bg-white p-6 lg:sticky lg:top-28">
                <h2 className="text-xl font-bold text-[#212121]">{t.focusTitle}</h2>
                <ul className="mt-5 space-y-3">
                  {t.focus.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-[#333333]">
                      <span className="text-[#AC8F52]"><CheckIcon /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 grid gap-3">
                  <a href={BOOKING_URL} className="inline-flex min-h-12 items-center justify-center rounded-[10px] bg-[#AC8F52] px-5 text-sm font-semibold text-[#212121] transition hover:brightness-105">
                    {t.appointment}
                  </a>
                  <Link to="/aerzte/$slug" params={{ slug: "walter-demmel" }} className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-[#212121] px-5 text-center text-sm font-semibold text-[#212121] transition-colors hover:bg-[#212121] hover:text-white">
                    {t.profile}
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </main>
      <PageFooter />
    </div>
  );
}