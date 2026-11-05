import { CtaLink } from "@/components/cta-link";
import { DemoVideo } from "@/components/demo-video";
import {
  AAVARNA_DEMO,
  CONTACT_NUMBERS,
  HELLO_AGENT,
  MSG_SHOP,
  PDF_HREF,
  PRODUCTS,
  TRY_IT_YOURSELF,
  whatsAppHref,
} from "@/lib/site";

const shopHref = whatsAppHref(MSG_SHOP);

export default function Home() {
  return (
    <div className="kit">
      <section className="hero">
        <span className="tag">Actionpackd · Chennai</span>
        <h1>Your boutique, answering customers 24 hours.</h1>
        <p>
          &quot;Price?&quot; &quot;Size?&quot; &quot;Is this available?&quot; Our agents reply on
          WhatsApp for you. They share new arrivals, send payment links and remind customers about
          pickup.
        </p>
        <CtaLink href={AAVARNA_DEMO} variant="secondary">
          See the live demo
        </CtaLink>
        <CtaLink href={TRY_IT_YOURSELF}>Try it yourself</CtaLink>
        <img
          src="/kit/hero-phone.webp"
          alt="Phone showing a boutique WhatsApp chat"
          width={420}
          height={747}
        />
      </section>

      <h2>See it work</h2>
      <p>
        This is a sample chat with <b>Demo Boutique</b> (not a real shop).
      </p>
      <div className="chat">
        <div className="top">
          Demo Boutique (sample)
          <small>Shop Agent · online</small>
        </div>
        <div className="msgs">
          <div className="day">Today</div>
          <div className="b c">Hi, any new arrivals?</div>
          <div className="b a">
            Hi! Here is our new collection this week:
            <div className="pics">
              <img src="/kit/saree.webp" alt="" width={560} height={560} loading="lazy" />
              <img src="/kit/blouse.webp" alt="" width={560} height={560} loading="lazy" />
              <img src="/kit/kurti.webp" alt="" width={560} height={560} loading="lazy" />
            </div>
            Silk saree · Embroidered blouse · Cotton kurti set
            <div className="t">10:02</div>
          </div>
          <div className="b c">
            Is the teal blouse there in size L?<div className="t">10:03</div>
          </div>
          <div className="b a">
            Yes, size L is in stock. We can also do small alterations.
            <div className="t">10:03</div>
          </div>
          <div className="b c">
            I&apos;ll take it<div className="t">10:04</div>
          </div>
          <div className="b a">
            Great choice! Pay here: <span className="link">pay.demo-link/blouse-L</span>
            <br />
            Payment Agent will confirm when done.
            <div className="t">10:04</div>
          </div>
          <div className="b c">
            Paid 👍<div className="t">10:06</div>
          </div>
          <div className="b a">
            Payment received. Thank you! 🎉 We will tell you when it is ready.
            <div className="t">10:06</div>
          </div>
          <div className="day">Next day</div>
          <div className="b a">
            Hi! Your blouse is ready for pickup. Come any time after 5 pm. 🛍️
            <div className="t">11:30</div>
          </div>
        </div>
      </div>
      <CtaLink href={TRY_IT_YOURSELF}>Try it yourself</CtaLink>

      <h2>Sample collection</h2>
      <p>Your own photos go here. The agent sends them to customers.</p>
      <div className="grid">
        <img src="/kit/saree.webp" alt="Silk saree" width={560} height={560} loading="lazy" />
        <img src="/kit/blouse.webp" alt="Blouse" width={560} height={560} loading="lazy" />
        <img src="/kit/kurti.webp" alt="Kurti set" width={560} height={560} loading="lazy" />
        <img
          src="/kit/hero-phone.webp"
          alt="Chat on phone"
          width={420}
          height={747}
          loading="lazy"
        />
      </div>

      <h2>Watch in 60 seconds</h2>
      <DemoVideo />

      <h2>What our agents do</h2>
      <div className="jobs">
        <div className="card job shop">
          <span className="mark" aria-hidden="true">01</span>
          <div>
            <b>Shop Agent</b>
            <p>Answers price, size and stock questions. Shares new arrivals.</p>
          </div>
        </div>
        <div className="card job pay">
          <span className="mark" aria-hidden="true">02</span>
          <div>
            <b>Payment Agent</b>
            <p>Sends payment links and gentle reminders.</p>
          </div>
        </div>
        <div className="card job follow">
          <span className="mark" aria-hidden="true">03</span>
          <div>
            <b>Follow-up Agent</b>
            <p>Sends &quot;ready for pickup&quot; and alteration reminders.</p>
          </div>
        </div>
      </div>
      <div className="card control">
        <b>You stay in control.</b> You see every chat. You can step in any time. We set it up with
        your photos.
      </div>

      <h2>Agents, bots, shops, and sites</h2>
      <p className="offer-lead">Give us the job. An agent, a bot, a shop, or a site does it.</p>
      <div className="offers">
        {PRODUCTS.map((product) => (
          <div className={`card offer ${product.title.toLowerCase()}`} key={product.title}>
            <b>{product.title}</b>
            <p>{product.body}</p>
          </div>
        ))}
      </div>

      <h2 id="try">Try the Aavarna boutique</h2>
      <p>
        The live sample is Aavarna: custom stitching, blouses, and an assistant, in English, Tamil,
        and Tanglish.
      </p>
      <CtaLink href={AAVARNA_DEMO}>Open the Aavarna demo</CtaLink>

      <CtaLink href={PDF_HREF} download="Actionpackd-demo-kit.pdf" variant="outline">
        Download the 1-page sheet (PDF)
      </CtaLink>
      <CtaLink href={shopHref} variant="secondary">
        Message us on WhatsApp to get it
      </CtaLink>

      <h2 id="contact">Contact</h2>
      <div className="card contact-card">
        <p className="contact-kicker">Call</p>
        <p className="contact-line">
          {CONTACT_NUMBERS.map((number, index) => (
            <span key={number.tel}>
              {index > 0 ? " / " : null}
              <a href={`tel:${number.tel}`}>{number.display}</a>
            </span>
          ))}
        </p>
      </div>
      <CtaLink href={HELLO_AGENT}>hello.actionpackd.com</CtaLink>

      <footer>Actionpackd, Chennai · &quot;Demo Boutique&quot; is a sample shop for this demo.</footer>
    </div>
  );
}
