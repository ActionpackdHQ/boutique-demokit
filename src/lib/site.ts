/** Public contact constants. Giri's direct number is intentionally unset. */
export const GIRI_PHONE_PLACEHOLDER = "[GIRI_PHONE_NUMBER]";

export const ACTIONPACKD_WHATSAPP_DISPLAY = "+91 81900 07072";
export const ACTIONPACKD_WHATSAPP_E164 = "918190007072";
export const ACTIONPACKD_SITE = "https://actionpackd.com";
export const HELLO_AGENT = "https://hello.actionpackd.com";
export const CONTACT_NUMBERS = [
  { display: "+91 733 964 0064", tel: "+917339640064" },
  { display: "87543 66890", tel: "+918754366890" },
] as const;
export const AAVARNA_DEMO = "https://aavarna-boutique.vercel.app/";
export const TRY_IT_YOURSELF =
  "https://api.whatsapp.com/send/?phone=918190007072&text=Hi%2C+I+want+to+try+the+boutique+agent+demo&type=phone_number&app_absent=0";
export const PDF_HREF = "/actionpackd-demo-kit.pdf";

export function whatsAppHref(text: string) {
  return `https://wa.me/${ACTIONPACKD_WHATSAPP_E164}?text=${encodeURIComponent(text)}`;
}

export const MSG_SHOP =
  "Hi, I want the boutique agent for my shop";
export const MSG_RAM =
  "Hi Ram, I would like to talk about an Actionpackd agent.";
export const MSG_GIRI =
  "Hi, I would like to speak with Giri Dharshini.";

export const PRODUCTS = [
  {
    title: "Agents",
    body: "A worker that qualifies leads, chases payments, books visits, and hands the hot ones to your team.",
  },
  {
    title: "Bots",
    body: "A tighter assistant for repeat questions: price, timings, stock, and simple capture.",
  },
  {
    title: "Shops",
    body: "A shopfront plus the agent behind it. Catalog, payment links, and pickup reminders, using your photos.",
  },
  {
    title: "Sites",
    body: "A public site that explains the offer and sends the visitor to the agent, the shop, or a person.",
  },
] as const;

export const SAMPLES = [
  {
    src: "/samples/sample-silk-saree.webp",
    title: "Silk saree",
    width: 800,
    height: 800,
    alt: "Sample photo of a folded maroon silk saree with a gold border. Not a customer's garment.",
  },
  {
    src: "/samples/sample-teal-blouse.webp",
    title: "Embroidered blouse",
    width: 800,
    height: 800,
    alt: "Sample photo of a teal blouse with gold embroidery. Not a customer's garment.",
  },
  {
    src: "/samples/sample-kurti-set.webp",
    title: "Cotton kurti set",
    width: 720,
    height: 720,
    alt: "Sample photo of an ivory printed cotton kurti set. Not a customer's garment.",
  },
  {
    src: "/samples/sample-aari-blouse.webp",
    title: "Aari blouse",
    width: 720,
    height: 720,
    alt: "Sample photo of magenta fabric with dense gold hand embroidery. Not a customer's garment.",
  },
] as const;

export const SAMPLE_DAY = [
  {
    title: "New arrivals",
    body: "A customer asks what came in this week. The shop agent sends the silk saree, the embroidered blouse, and the cotton kurti.",
  },
  {
    title: "Size, then payment",
    body: "They want the teal blouse in size L. It is in stock, and small alterations are fine. They pay through a link. The payment agent confirms.",
  },
  {
    title: "Ready for pickup",
    body: "Next day, the follow-up agent says the blouse is ready after 5 pm. You still see the thread and can step in.",
  },
] as const;

export const AGENT_JOBS = [
  {
    title: "Shop Agent",
    body: "Answers price, size, and stock questions. Shares new arrivals.",
  },
  {
    title: "Payment Agent",
    body: "Sends payment links and gentle reminders.",
  },
  {
    title: "Follow-up Agent",
    body: "Sends “ready for pickup” and alteration reminders.",
  },
] as const;
