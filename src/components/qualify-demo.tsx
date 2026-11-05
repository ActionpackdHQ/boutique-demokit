"use client";

import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { CtaLink } from "@/components/cta-link";
import {
  type Answer,
  type OfferingId,
  DEMO_PATHS,
  handoffMessage,
  handoffWhatsAppHref,
  isBoutiquePath,
  nextQuestion,
  offeringLabel,
  questionProgress,
  resultCopy,
} from "@/lib/qualify";
import { AAVARNA_DEMO, HELLO_AGENT } from "@/lib/site";
import { cn } from "@/lib/utils";

const choiceClass = cn(
  buttonVariants({ variant: "outline", size: "lg" }),
  "h-auto min-h-12 w-full justify-start whitespace-normal rounded-2xl px-4 py-3 text-left text-[15px] font-medium leading-snug",
);

export function QualifyDemo() {
  const [offering, setOffering] = useState<OfferingId | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  const question = offering ? nextQuestion(offering, answers) : null;
  const done = Boolean(offering && !question && answers.length > 0);

  function reset() {
    setOffering(null);
    setAnswers([]);
    setCopyState("idle");
  }

  function selectOffering(id: OfferingId) {
    setOffering(id);
    setAnswers([]);
    setCopyState("idle");
  }

  function choose(optionId: string) {
    if (!question) return;
    const option = question.options.find((item) => item.id === optionId);
    if (!option) return;
    setAnswers((current) => [
      ...current,
      {
        questionId: question.id,
        prompt: question.prompt,
        optionId: option.id,
        label: option.label,
      },
    ]);
    setCopyState("idle");
  }

  function back() {
    setCopyState("idle");
    if (answers.length === 0) {
      setOffering(null);
      return;
    }
    setAnswers((current) => current.slice(0, -1));
  }

  async function copySummary(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <section
      id="demo"
      aria-labelledby="demo-title"
      className="rounded-3xl bg-card p-4 ring-1 ring-foreground/10"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Interactive demo
      </p>
      <h2 id="demo-title" className="font-heading mt-1 text-[1.65rem] leading-tight">
        Qualify a lead
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
        Guided questions for this sales kit. This is not a WhatsApp chat, and nothing is sent until
        you open Hello or WhatsApp.
      </p>

      <div aria-live="polite" className="mt-4">
        {!offering && (
          <div className="grid gap-2">
            <p className="text-sm font-medium">What should we look at?</p>
            {DEMO_PATHS.map((path) => (
              <button
                key={path.id}
                type="button"
                className={cn(choiceClass, "flex-col items-start gap-1")}
                onClick={() => selectOffering(path.id)}
              >
                <span className="block font-semibold">{path.title}</span>
                <span className="mt-0.5 block font-normal text-muted-foreground">{path.detail}</span>
              </button>
            ))}
          </div>
        )}

        {offering && question && (
          <form
            onSubmit={(event) => event.preventDefault()}
          >
            <Progress offering={offering} answers={answers} />
            <fieldset className="mt-3 grid gap-2">
              <legend className="text-lg font-semibold leading-snug">{question.prompt}</legend>
              {question.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={choiceClass}
                  onClick={() => choose(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </fieldset>
            <button
              type="button"
              onClick={back}
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "mt-3 h-11 px-2 text-base")}
            >
              Back
            </button>
          </form>
        )}

        {offering && done && (
          <Result
            offering={offering}
            answers={answers}
            copyState={copyState}
            onCopy={copySummary}
            onBack={back}
            onReset={reset}
          />
        )}
      </div>
    </section>
  );
}

function Progress({ offering, answers }: { offering: OfferingId; answers: Answer[] }) {
  const progress = questionProgress(offering, answers);
  return (
    <p className="text-sm text-muted-foreground">
      {offeringLabel(offering)}
      {" · "}
      {progress.total
        ? `Question ${progress.current} of ${progress.total}`
        : `Question ${progress.current}`}
    </p>
  );
}

function Result({
  offering,
  answers,
  copyState,
  onCopy,
  onBack,
  onReset,
}: {
  offering: OfferingId;
  answers: Answer[];
  copyState: "idle" | "copied" | "failed";
  onCopy: (text: string) => void;
  onBack: () => void;
  onReset: () => void;
}) {
  const copy = resultCopy(offering, answers);
  const message = handoffMessage(offering, answers);
  const boutique = isBoutiquePath(offering, answers);

  return (
    <div className="grid gap-3">
      <p className="text-sm text-muted-foreground">{offeringLabel(offering)} · ready to hand off</p>
      <h3 className="font-heading text-2xl leading-tight">{copy.heading}</h3>
      <p className="text-[15px] leading-relaxed">{copy.fit}</p>
      <dl className="grid gap-2 rounded-2xl bg-background p-3 text-sm">
        {answers.map((answer) => (
          <div key={answer.questionId}>
            <dt className="text-muted-foreground">{answer.prompt}</dt>
            <dd className="font-medium">{answer.label}</dd>
          </div>
        ))}
      </dl>
      <CtaLink href={HELLO_AGENT}>Continue with the Hello agent</CtaLink>
      <CtaLink href={handoffWhatsAppHref(offering, answers)} variant="outline">
        Send this to Ram on WhatsApp
      </CtaLink>
      {boutique && (
        <CtaLink href={AAVARNA_DEMO} variant="secondary">
          Try the Aavarna boutique
        </CtaLink>
      )}
      <p className="text-[15px] leading-relaxed text-muted-foreground">
        Hello asks for a WhatsApp number next. The summary stays here so you can paste it. Nothing
        is sent until you tap a button.
      </p>
      <pre className="overflow-x-auto whitespace-pre-wrap rounded-2xl bg-background p-3 font-sans text-sm leading-relaxed">
        {message}
      </pre>
      <button type="button" className={choiceClass} onClick={() => onCopy(message)}>
        {copyState === "copied"
          ? "Summary copied"
          : copyState === "failed"
            ? "Copy failed — select the summary above"
            : "Copy summary"}
      </button>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onBack}
          className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "h-11 flex-1 text-base")}
        >
          Change last answer
        </button>
        <button
          type="button"
          onClick={onReset}
          className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "h-11 flex-1 text-base")}
        >
          Start again
        </button>
      </div>
    </div>
  );
}
