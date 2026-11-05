import Image from "next/image";

import { BoutiqueFrame } from "@/components/boutique-frame";
import { CtaLink } from "@/components/cta-link";
import { QualifyDemo } from "@/components/qualify-demo";
import {
  AAVARNA_DEMO,
  ACTIONPACKD_SITE,
  ACTIONPACKD_WHATSAPP_DISPLAY,
  ACTIONPACKD_WHATSAPP_E164,
  AGENT_JOBS,
  GIRI_PHONE_PLACEHOLDER,
  HELLO_AGENT,
  MSG_GIRI,
  MSG_RAM,
  MSG_SHOP,
  PDF_HREF,
  PRODUCTS,
  SAMPLE_DAY,
  SAMPLES,
  whatsAppHref,
} from "@/lib/site";

const shopHref = whatsAppHref(MSG_SHOP);
const ramHref = whatsAppHref(MSG_RAM);
const giriHref = whatsAppHref(MSG_GIRI);
const callHref = `tel:+${ACTIONPACKD_WHATSAPP_E164}`;

export default function Home() {
  const hero = SAMPLES[0];

  return (
    <>
      <div className="h-1.5 bg-primary" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:rounded-xl focus:bg-card focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto w-full max-w-[32rem] px-4 pb-8 pt-5">
        <header className="flex items-center justify-between gap-3">
          <a
            href={ACTIONPACKD_SITE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl"
          >
            <Image
              src="/brand/mascot.png"
              alt=""
              width={128}
              height={128}
              priority
              className="size-12"
            />
            <span>
              <span className="block text-base font-semibold tracking-tight">Actionpackd</span>
              <span className="block text-xs text-muted-foreground">Chennai · Sales demo kit</span>
            </span>
          </a>
          <a
            href={PDF_HREF}
            download="Actionpackd-demo-kit.pdf"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            PDF
          </a>
        </header>

        <main id="main" className="mt-6 grid gap-10">
          <section className="grid gap-4">
            <p className="w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              Actionpackd · Chennai
            </p>
            <h1 className="font-heading text-[2rem] leading-[1.15] tracking-tight">
              Your boutique, answering customers 24 hours.
            </h1>
            <p className="text-[17px] leading-relaxed">
              “Price?” “Size?” “Is this available?” Agents reply on WhatsApp for you. They share
              new arrivals, send payment links, and remind customers about pickup.
            </p>

            <div id="offerings" className="grid gap-2">
              <h2 className="font-heading text-[1.65rem] leading-tight">
                Agents, bots, shops, and sites
              </h2>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Actionpackd provides these four. This page shows them through a boutique.
              </p>
              <ul className="grid grid-cols-2 gap-2">
                {PRODUCTS.map((product) => (
                  <li key={product.title} className="rounded-2xl bg-card px-4 py-3 ring-1 ring-foreground/10">
                    <h3 className="text-base font-semibold">{product.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-muted-foreground">{product.body}</p>
                  </li>
                ))}
              </ul>
            </div>

            <CtaLink href={AAVARNA_DEMO}>Try it yourself</CtaLink>
            <CtaLink href={shopHref} variant="outline">
              Message us on WhatsApp to get it
            </CtaLink>

            <figure className="overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/10">
              <Image
                src={hero.src}
                alt={hero.alt}
                width={hero.width}
                height={hero.height}
                priority
                sizes="(min-width: 640px) 512px, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                <span className="font-medium">Sample · silk saree</span>
                <span className="text-muted-foreground">Your photos replace this</span>
              </figcaption>
            </figure>
          </section>

          <section className="grid gap-4" aria-labelledby="see-title">
            <h2 id="see-title" className="font-heading text-[1.65rem] leading-tight">
              See it work
            </h2>
            <p className="text-[17px] leading-relaxed">
              Demo Boutique is a sample, not a real shop. The day below is the story. The panel
              under it is the part you can use.
            </p>
            <ol className="grid gap-2">
              {SAMPLE_DAY.map((step, index) => (
                <li key={step.title} className="rounded-2xl bg-card px-4 py-3 ring-1 ring-foreground/10">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Step {index + 1}
                  </p>
                  <p className="mt-1 font-semibold">{step.title}</p>
                  <p className="mt-1 text-[15px] leading-snug text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
            <QualifyDemo />
            <CtaLink href={AAVARNA_DEMO}>Try it yourself</CtaLink>
          </section>

          <section id="try" className="grid gap-4" aria-labelledby="try-title">
            <h2 id="try-title" className="font-heading text-[1.65rem] leading-tight">
              Try it yourself
            </h2>
            <p className="text-[17px] leading-relaxed">
              Aavarna is the boutique demo linked from this kit: custom stitching, blouses, and an
              assistant, in English, Tamil, and Tanglish.
            </p>
            <CtaLink href={AAVARNA_DEMO}>Open the Aavarna boutique</CtaLink>
            <BoutiqueFrame />
          </section>

          <section className="grid gap-4" aria-labelledby="collection-title">
            <h2 id="collection-title" className="font-heading text-[1.65rem] leading-tight">
              Sample collection
            </h2>
            <p className="text-[17px] leading-relaxed">
              Your own photos go here. The agent sends them to customers. These four are samples
              made for this demo kit.
            </p>
            <ul className="grid grid-cols-2 gap-3">
              {SAMPLES.map((sample) => (
                <li key={sample.src} className="overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10">
                  <Image
                    src={sample.src}
                    alt={sample.alt}
                    width={sample.width}
                    height={sample.height}
                    sizes="(min-width: 640px) 240px, 45vw"
                    className="aspect-square w-full object-cover"
                  />
                  <p className="px-3 py-2 text-sm">
                    <span className="font-semibold">Sample</span>
                    <span className="text-muted-foreground"> · {sample.title}</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="grid gap-4" aria-labelledby="video-title">
            <h2 id="video-title" className="font-heading text-[1.65rem] leading-tight">
              Watch in 60 seconds
            </h2>
            <div
              id="video"
              className="flex aspect-[9/16] max-h-[26rem] items-center justify-center rounded-3xl bg-foreground px-6 text-center text-background"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-background/70">
                  Placeholder
                </p>
                <p className="mt-2 text-xl font-semibold">60-second demo video</p>
                <p className="mt-2 text-sm leading-relaxed text-background/80">
                  Coming soon. There is no video in this kit yet.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-3" aria-labelledby="agents-title">
            <h2 id="agents-title" className="font-heading text-[1.65rem] leading-tight">
              What our agents do
            </h2>
            {AGENT_JOBS.map((job) => (
              <article key={job.title} className="rounded-2xl bg-card px-4 py-3 ring-1 ring-foreground/10">
                <h3 className="font-semibold">{job.title}</h3>
                <p className="mt-1 text-[15px] leading-snug text-muted-foreground">{job.body}</p>
              </article>
            ))}
            <article className="rounded-2xl bg-card px-4 py-3 ring-1 ring-foreground/10">
              <h3 className="font-semibold">You stay in control.</h3>
              <p className="mt-1 text-[15px] leading-snug text-muted-foreground">
                You see every chat. You can step in any time. We set it up with your photos.
              </p>
            </article>
          </section>

          <section id="sheet" className="grid gap-3" aria-labelledby="sheet-title">
            <h2 id="sheet-title" className="sr-only">
              Take the next step
            </h2>
            <CtaLink href={PDF_HREF} download="Actionpackd-demo-kit.pdf" variant="outline">
              Download the 1-page sheet (PDF)
            </CtaLink>
            <CtaLink href={AAVARNA_DEMO}>Try it yourself</CtaLink>
            <CtaLink href={shopHref} variant="secondary">
              Message us on WhatsApp to get it
            </CtaLink>
          </section>

          <section id="contact" className="grid gap-3" aria-labelledby="contact-title">
            <h2 id="contact-title" className="font-heading text-[1.65rem] leading-tight">
              Talk to a person
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Qualified leads go to Ram and the Actionpackd line. Giri’s direct number is still a
              placeholder.
            </p>

            <article className="grid gap-3 rounded-3xl bg-card p-4 ring-1 ring-foreground/10">
              <div>
                <h3 className="text-lg font-semibold">Ram Sir</h3>
                <p className="text-sm text-muted-foreground">Founder & CEO, Actionpackd</p>
              </div>
              <p className="text-[15px] leading-relaxed">
                Message or call the Actionpackd number. This is the team line, not a guessed
                personal number.
              </p>
              <p className="text-base font-semibold">{ACTIONPACKD_WHATSAPP_DISPLAY}</p>
              <p className="break-all text-sm">
                <a className="font-medium text-primary underline-offset-4 hover:underline" href={ramHref}>
                  https://wa.me/{ACTIONPACKD_WHATSAPP_E164}
                </a>
              </p>
              <CtaLink href={ramHref}>Message Ram Sir on WhatsApp</CtaLink>
              <CtaLink href={callHref} variant="outline" external={false}>
                Call {ACTIONPACKD_WHATSAPP_DISPLAY}
              </CtaLink>
            </article>

            <article className="grid gap-3 rounded-3xl bg-card p-4 ring-1 ring-foreground/10">
              <div>
                <h3 className="text-lg font-semibold">Giri Dharshini</h3>
                <p className="text-sm text-muted-foreground">Chief Operating Officer, Actionpackd</p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                Placeholder · not a working number
              </p>
              <p className="font-mono text-lg tracking-tight">{GIRI_PHONE_PLACEHOLDER}</p>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Her direct number is not on file. The line below asks the Actionpackd WhatsApp for
                her. It does not pretend to be her phone.
              </p>
              <CtaLink href={giriHref} variant="outline">
                Ask for Giri on the Actionpackd WhatsApp
              </CtaLink>
            </article>

            <article className="grid gap-3 rounded-3xl bg-card p-4 ring-1 ring-foreground/10">
              <h3 className="text-lg font-semibold">Actionpackd</h3>
              <ul className="grid gap-2 text-[15px]">
                <li>
                  <a className="font-medium text-primary underline-offset-4 hover:underline" href={ACTIONPACKD_SITE}>
                    actionpackd.com
                  </a>
                </li>
                <li>
                  <a className="font-medium text-primary underline-offset-4 hover:underline" href={HELLO_AGENT}>
                    Hello agent · hello.actionpackd.com
                  </a>
                </li>
                <li>
                  WhatsApp {ACTIONPACKD_WHATSAPP_DISPLAY}
                  <span className="mt-1 block break-all">
                    <a className="font-medium text-primary underline-offset-4 hover:underline" href={shopHref}>
                      https://wa.me/{ACTIONPACKD_WHATSAPP_E164}
                    </a>
                  </span>
                </li>
              </ul>
              <CtaLink href={HELLO_AGENT}>Open the Hello agent</CtaLink>
              <CtaLink href={ACTIONPACKD_SITE} variant="outline">
                Visit actionpackd.com
              </CtaLink>
            </article>
          </section>
        </main>

        <footer className="mt-10 text-center text-sm leading-relaxed text-muted-foreground">
          Actionpackd, Chennai. Demo Boutique is a sample shop for this demo. Garment photos are
          samples. Aavarna is the linked boutique.
        </footer>
      </div>
    </>
  );
}
