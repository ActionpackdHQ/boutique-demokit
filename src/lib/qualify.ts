import { whatsAppHref } from "@/lib/site";

export type OfferingId = "boutiques" | "agents" | "bots" | "shops" | "sites";

export type Option = { id: string; label: string };

export type Question = {
  id: string;
  prompt: string;
  options: Option[];
};

export type Answer = {
  questionId: string;
  prompt: string;
  optionId: string;
  label: string;
};

export const DEMO_PATHS: { id: OfferingId; title: string; detail: string }[] = [
  {
    id: "boutiques",
    title: "Boutiques",
    detail: "Exactly two questions, then a handoff. This is the sample on this page.",
  },
  {
    id: "agents",
    title: "Agents",
    detail: "Three questions: the job, the channel, and when you want a first version.",
  },
  {
    id: "bots",
    title: "Bots",
    detail: "Four questions: what it answers, where, in which languages, and when it should stop.",
  },
  {
    id: "shops",
    title: "Shops",
    detail: "A boutique branch stops at two questions. Other shops continue to four.",
  },
  {
    id: "sites",
    title: "Sites",
    detail: "Three questions: the kind of site, what you have now, and day one.",
  },
];

const BOUTIQUE_REACH: Question = {
  id: "reach",
  prompt: "How do customers reach the boutique today?",
  options: [
    { id: "whatsapp", label: "WhatsApp" },
    { id: "instagram", label: "Instagram" },
    { id: "walkin", label: "Walk-in and phone" },
    { id: "mix", label: "A mix of these" },
  ],
};

const BOUTIQUE_JOB: Question = {
  id: "first-job",
  prompt: "What should the agent handle first?",
  options: [
    { id: "stock", label: "Price, size, and stock" },
    { id: "pay", label: "Payment links" },
    { id: "pickup", label: "Pickup and alteration reminders" },
    { id: "all", label: "All three, with a person able to step in" },
  ],
};

const AGENT_JOB: Question = {
  id: "agent-job",
  prompt: "What job should the agent take?",
  options: [
    { id: "leads", label: "Win and qualify leads" },
    { id: "payments", label: "Collect payments" },
    { id: "book", label: "Book appointments" },
    { id: "coordinate", label: "Coordinate work across the team" },
  ],
};

const AGENT_CHANNEL: Question = {
  id: "agent-channel",
  prompt: "Where should it work?",
  options: [
    { id: "whatsapp", label: "WhatsApp" },
    { id: "instagram", label: "Instagram" },
    { id: "website", label: "On your website" },
    { id: "tools", label: "Inside the tools you already use" },
  ],
};

const AGENT_WHEN: Question = {
  id: "agent-when",
  prompt: "When do you want a first version?",
  options: [
    { id: "week", label: "This week" },
    { id: "month", label: "This month" },
    { id: "comparing", label: "We are comparing options" },
  ],
};

const BOT_ANSWERS: Question = {
  id: "bot-answers",
  prompt: "What should the bot answer?",
  options: [
    { id: "faq", label: "Prices, timings, and stock" },
    { id: "status", label: "Order or booking status" },
    { id: "appointments", label: "Appointment requests" },
    { id: "handover", label: "New enquiries, then hand them over" },
  ],
};

const BOT_CHANNEL: Question = {
  id: "bot-channel",
  prompt: "Which channel should it use?",
  options: [
    { id: "whatsapp", label: "WhatsApp" },
    { id: "website", label: "A box on your website" },
    { id: "instagram", label: "Instagram" },
    { id: "multi", label: "More than one" },
  ],
};

const BOT_LANGUAGE: Question = {
  id: "bot-language",
  prompt: "Which languages should it handle?",
  options: [
    { id: "english", label: "English" },
    { id: "tamil", label: "Tamil and Tanglish" },
    { id: "both", label: "English and Tamil" },
    { id: "other", label: "Another language — we will tell you" },
  ],
};

const BOT_UNSURE: Question = {
  id: "bot-unsure",
  prompt: "When it is unsure, what should happen?",
  options: [
    { id: "human", label: "Ask a person on your team" },
    { id: "check", label: "Say it will check, and stop" },
    { id: "number", label: "Collect a number and end" },
  ],
};

const SHOP_KIND: Question = {
  id: "shop-kind",
  prompt: "What kind of shop is it?",
  options: [
    { id: "boutique", label: "Boutique or clothing studio" },
    { id: "grocery", label: "Food or grocery" },
    { id: "other", label: "Another retail shop" },
  ],
};

const SHOP_BOUTIQUE_NEXT: Question = {
  id: "shop-first",
  prompt: "What should we set up first for the boutique?",
  options: [
    { id: "catalog", label: "A catalog the agent can send" },
    { id: "pay", label: "Payment links and reminders" },
    { id: "pickup", label: "Pickup and alteration messages" },
    { id: "loop", label: "The full shop loop" },
  ],
};

const SHOP_CATALOG: Question = {
  id: "shop-catalog",
  prompt: "How big is the catalog you would start with?",
  options: [
    { id: "under30", label: "Under 30 items" },
    { id: "mid", label: "30 to 200 items" },
    { id: "large", label: "Larger — we will narrow it" },
  ],
};

const SHOP_PAY: Question = {
  id: "shop-pay",
  prompt: "How do you want to get paid?",
  options: [
    { id: "link", label: "Payment link in the chat" },
    { id: "counter", label: "Pay at the counter" },
    { id: "both", label: "Both" },
  ],
};

const SHOP_CHANNEL: Question = {
  id: "shop-channel",
  prompt: "Where should the shop agent sit?",
  options: [
    { id: "whatsapp", label: "WhatsApp" },
    { id: "site", label: "Your site" },
    { id: "both", label: "WhatsApp and the site" },
  ],
};

const SITE_KIND: Question = {
  id: "site-kind",
  prompt: "What kind of site do you need?",
  options: [
    { id: "offer", label: "A public page for one offer" },
    { id: "catalog", label: "A catalog or shop" },
    { id: "bookings", label: "Bookings" },
    { id: "portal", label: "A customer portal" },
  ],
};

const SITE_NOW: Question = {
  id: "site-now",
  prompt: "Do you already have a site?",
  options: [
    { id: "fresh", label: "No — start fresh" },
    { id: "refresh", label: "Yes — it needs a refresh" },
    { id: "keep", label: "Yes — keep it and add an agent" },
  ],
};

const SITE_DAY: Question = {
  id: "site-day",
  prompt: "What must it do on day one?",
  options: [
    { id: "explain", label: "Explain the offer" },
    { id: "enquiries", label: "Take enquiries" },
    { id: "book", label: "Take bookings" },
    { id: "whatsapp", label: "Send people to WhatsApp" },
  ],
};

function shopKind(answers: Answer[]) {
  return answers.find((answer) => answer.questionId === "shop-kind")?.optionId;
}

export function questionsFor(offering: OfferingId, answers: Answer[]): Question[] {
  switch (offering) {
    case "boutiques":
      return [BOUTIQUE_REACH, BOUTIQUE_JOB];
    case "agents":
      return [AGENT_JOB, AGENT_CHANNEL, AGENT_WHEN];
    case "bots":
      return [BOT_ANSWERS, BOT_CHANNEL, BOT_LANGUAGE, BOT_UNSURE];
    case "sites":
      return [SITE_KIND, SITE_NOW, SITE_DAY];
    case "shops": {
      const kind = shopKind(answers);
      if (!kind) return [SHOP_KIND];
      if (kind === "boutique") return [SHOP_KIND, SHOP_BOUTIQUE_NEXT];
      return [SHOP_KIND, SHOP_CATALOG, SHOP_PAY, SHOP_CHANNEL];
    }
  }
}

export function nextQuestion(offering: OfferingId, answers: Answer[]): Question | null {
  return questionsFor(offering, answers)[answers.length] ?? null;
}

export function questionProgress(
  offering: OfferingId,
  answers: Answer[],
): { current: number; total: number | null } {
  if (offering === "shops" && !shopKind(answers)) {
    return { current: 1, total: null };
  }
  const total = questionsFor(offering, answers).length;
  return { current: Math.min(answers.length + 1, total), total };
}

export function isBoutiquePath(offering: OfferingId, answers: Answer[]) {
  return offering === "boutiques" || shopKind(answers) === "boutique";
}

function labelFor(answers: Answer[], questionId: string) {
  return answers.find((answer) => answer.questionId === questionId)?.label;
}

function optionFor(answers: Answer[], questionId: string) {
  return answers.find((answer) => answer.questionId === questionId)?.optionId;
}

export function offeringLabel(offering: OfferingId) {
  return DEMO_PATHS.find((path) => path.id === offering)?.title ?? offering;
}

export function resultCopy(offering: OfferingId, answers: Answer[]) {
  const boutique = isBoutiquePath(offering, answers);

  if (boutique) {
    const job = optionFor(answers, "first-job") ?? optionFor(answers, "shop-first");
    const reach = labelFor(answers, "reach");
    const reachBit = reach ? ` Customers reach you by ${reach}.` : "";
    let fit =
      "Start with a shop agent for price, size, and what just arrived. Payment and pickup can follow.";
    if (job === "pay") {
      fit = "Start with a payment agent: a link in the chat, then a gentle reminder.";
    } else if (job === "pickup") {
      fit = "Start with follow-up: ready for pickup, and alteration reminders.";
    } else if (job === "all" || job === "loop") {
      fit =
        "Set up the shop agent, the payment agent, and follow-up together. You can step into any chat.";
    } else if (job === "catalog") {
      fit = "Start with a small catalog the agent can send, using your own photos.";
    }
    return {
      heading: "Qualified for a boutique agent",
      fit: `${fit}${reachBit} You stay in control. We set it up with your photos.`,
    };
  }

  if (offering === "agents") {
    const job = labelFor(answers, "agent-job") ?? "the job you picked";
    const where = labelFor(answers, "agent-channel") ?? "your channel";
    const when = labelFor(answers, "agent-when") ?? "when you are ready";
    return {
      heading: "Qualified for an agent",
      fit: `${job} on ${where}. Timing: ${when}. The agent does that job and hands off when a person should close.`,
    };
  }

  if (offering === "bots") {
    const answersLabel = labelFor(answers, "bot-answers") ?? "repeat questions";
    const channel = labelFor(answers, "bot-channel") ?? "your channel";
    const language = labelFor(answers, "bot-language") ?? "the languages you need";
    const unsure = labelFor(answers, "bot-unsure") ?? "ask a person";
    return {
      heading: "Qualified for a bot",
      fit: `A bot for ${answersLabel}, on ${channel}, in ${language}. When it is unsure: ${unsure}.`,
    };
  }

  if (offering === "shops") {
    const kind = labelFor(answers, "shop-kind") ?? "your shop";
    const catalog = labelFor(answers, "shop-catalog");
    const pay = labelFor(answers, "shop-pay");
    const channel = labelFor(answers, "shop-channel");
    return {
      heading: "Qualified for a shop",
      fit: `${kind}. ${[catalog && `Catalog: ${catalog}`, pay && `Payment: ${pay}`, channel && `Channel: ${channel}`].filter(Boolean).join(". ")}.`,
    };
  }

  const kind = labelFor(answers, "site-kind") ?? "a site";
  const now = labelFor(answers, "site-now") ?? "starting from where you are";
  const day = labelFor(answers, "site-day") ?? "the first job";
  return {
    heading: "Qualified for a site",
    fit: `${kind}. Today: ${now}. On day one it should ${day.charAt(0).toLowerCase()}${day.slice(1)}.`,
  };
}

export function handoffMessage(offering: OfferingId, answers: Answer[]) {
  const lines = [
    "Hi Ram, this lead is from the Actionpackd demo kit.",
    "",
    `Offering: ${offeringLabel(offering)}`,
    ...answers.map((answer) => `${answer.prompt} ${answer.label}`),
    "",
    "Please send the right plan.",
  ];
  return lines.join("\n");
}

export function handoffWhatsAppHref(offering: OfferingId, answers: Answer[]) {
  return whatsAppHref(handoffMessage(offering, answers));
}
