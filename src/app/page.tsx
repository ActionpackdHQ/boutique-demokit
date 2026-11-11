import { IndianRupee, Package, ShieldCheck, ShoppingBag } from "lucide-react";

import { CtaLink } from "@/components/cta-link";
import { DemoVideo } from "@/components/demo-video";
import {
  AAVARNA_DEMO,
  ACTIONPACKD_WHATSAPP_DISPLAY,
  ACTIONPACKD_WHATSAPP_E164,
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

      <h2>Agents, bots, shops, and sites</h2>
      <p>Give us the job. An agent, a bot, a shop, or a site does it.</p>
      {PRODUCTS.map((product) => (
        <div className="card" key={product.title}>
          <b>{product.title}</b>
          <br />
          {product.body}
        </div>
      ))}

      <h2>Watch in 30 seconds</h2>
      <DemoVideo />

      <h2 id="team">Your team that never sleeps</h2>
      <div className="team">
        <div className="card team-card">
          <span className="team-icon" aria-hidden="true">
            <ShoppingBag />
          </span>
          <div>
            <b>The Shop Keeper</b>
            <p>Knows every saree, size and price by heart. Shows new arrivals before she even asks.</p>
          </div>
        </div>
        <div className="card team-card">
          <span className="team-icon" aria-hidden="true">
            <IndianRupee />
          </span>
          <div>
            <b>The Cashier</b>
            <p>Sends the pay link the moment she says yes. Nudges her gently, never pushily.</p>
          </div>
        </div>
        <div className="card team-card">
          <span className="team-icon" aria-hidden="true">
            <Package />
          </span>
          <div>
            <b>The Pickup Buddy</b>
            <p>&quot;Your blouse is ready ✨&quot; goes out on time, every time. Alterations and pickups, never forgotten.</p>
          </div>
        </div>
        <div className="card team-card">
          <span className="team-icon" aria-hidden="true">
            <ShieldCheck />
          </span>
          <div>
            <b>You&apos;re still the owner</b>
            <p>Every chat in front of you. Jump in whenever you want. Set up with your own photos in a day.</p>
          </div>
        </div>
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
        <p className="contact-line">
          <a href={`https://wa.me/${ACTIONPACKD_WHATSAPP_E164}`}>{ACTIONPACKD_WHATSAPP_DISPLAY}</a>
        </p>
      </div>
      <CtaLink href={HELLO_AGENT}>hello.actionpackd.com</CtaLink>

      <footer>Actionpackd, Chennai · &quot;Demo Boutique&quot; is a sample shop for this demo.</footer>
    </div>
  );
}
