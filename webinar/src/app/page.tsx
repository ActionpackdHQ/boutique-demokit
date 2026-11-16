import { CursorGlow } from "@/components/cursor-glow";
import { Dock } from "@/components/dock";
import { Hero } from "@/components/hero";
import { RegisterLink } from "@/components/register-link";
import { Reveal } from "@/components/reveal";
import { ACTIONPACKD_SITE, HELLO_SITE, WHATSAPP_CONTACT } from "@/lib/site";

const hours = [
  "Build your first bot live on Telegram with Gemini",
  "Give it a personality",
  "Make an AI avatar video of yourself introducing your bot with HeyGen, in Tamil and English",
  "A 10-minute live challenge, top 3 get a LinkedIn shout-out from Actionpackd",
];

const takeaways = [
  "Your own working bot",
  "An AI avatar video",
  "A certificate of participation",
  "A LinkedIn-ready post",
];

const agenda = [
  "Hook demo",
  "Why bots now",
  "Build together",
  "AI video wow",
  "Live challenge",
  "What's next: the 6-week Actionpackd Bots Cohort",
];

const questions = [
  ["Do I need coding?", "No."],
  ["What do I need?", "A laptop and internet."],
  ["Is it recorded?", "Details shared after registration"],
] as const;

export default function Home() {
  return (
    <>
      <header className="nav">
        <a className="wordmark" href="#top">
          <span className="brand-mark">AP</span>
          Actionpackd
        </a>
        <RegisterLink className="nav-register">Register</RegisterLink>
      </header>

      <main>
        <Hero />

        <section id="do" className="section">
          <Reveal>
            <h2>What you&apos;ll do in 2 hours</h2>
          </Reveal>
          <Reveal>
            <ol className="beats">
              {hours.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section id="who" className="section who">
          <Reveal>
            <h2>Who it&apos;s for</h2>
            <p>College students.</p>
            <p>Any branch.</p>
            <p>No coding needed.</p>
          </Reveal>
        </section>

        <section id="away" className="section">
          <Reveal>
            <h2>What you walk away with</h2>
          </Reveal>
          <Reveal>
            <ul className="takeaways">
              {takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section id="agenda" className="section">
          <Reveal>
            <h2>Agenda</h2>
          </Reveal>
          <Reveal>
            <ol className="agenda">
              {agenda.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section id="certificate" className="section">
          <Reveal>
            <h2>Your certificate.</h2>
            <p className="caption">Every participant gets one, with their own Bot ID.</p>
            <figure className="certificate">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/certificate.webp"
                alt="Sample certificate of participation for Dream it. Bot it. Live."
                width={1492}
                height={1054}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </Reveal>
        </section>

        <section id="faq" className="section">
          <Reveal>
            <h2>FAQ</h2>
          </Reveal>
          <dl className="faq">
            {questions.map(([question, answer]) => (
            <Reveal key={question} className="faq-row">
              <div>
                <dt>{question}</dt>
                <dd>{answer}</dd>
              </div>
            </Reveal>
            ))}
          </dl>
        </section>

        <section id="register" className="section finale">
          <Reveal>
            <h2>
              <span className="kicker">Why not?</span>
              <span className="display display-end">
                Get a bot<span className="stop">.</span>
              </span>
            </h2>
            <RegisterLink className="btn" magnetic>
              Register
            </RegisterLink>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <a href={ACTIONPACKD_SITE}>actionpackd.com</a>
        <span aria-hidden="true">·</span>
        <a href={HELLO_SITE}>hello.actionpackd.com</a>
        <span aria-hidden="true">·</span>
        <a href={WHATSAPP_CONTACT}>WhatsApp +91 81900 07072</a>
      </footer>

      <CursorGlow />
      <Dock />
    </>
  );
}
