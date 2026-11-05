"use client";

import { useState } from "react";

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
    >
      <h2 id="demo-title">Qualify a lead</h2>
      <p>
        Guided questions. This is not the sample chat above, and nothing is sent until you open
        Hello or WhatsApp.
      </p>

      <div aria-live="polite" className="mt-4">
        {!offering && (
          <div>
            <p>What should we look at?</p>
            {DEMO_PATHS.map((path) => (
              <button key={path.id} type="button" className="kit-choice" onClick={() => selectOffering(path.id)}>
                <b>{path.title}</b>
                <span>{path.detail}</span>
              </button>
            ))}
          </div>
        )}

        {offering && question && (
          <form
            onSubmit={(event) => event.preventDefault()}
          >
            <Progress offering={offering} answers={answers} />
            <fieldset>
              <legend>{question.prompt}</legend>
              {question.options.map((option) => (
                <button key={option.id} type="button" className="kit-choice" onClick={() => choose(option.id)}>
                  {option.label}
                </button>
              ))}
            </fieldset>
            <button type="button" onClick={back} className="kit-back">
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
    <p className="muted">
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
    <div>
      <p className="muted">{offeringLabel(offering)} · ready to hand off</p>
      <p>
        <b>{copy.heading}.</b> {copy.fit}
      </p>
      <div className="card">
        {answers.map((answer) => (
          <p key={answer.questionId}>
            {answer.prompt}
            <br />
            <b>{answer.label}</b>
          </p>
        ))}
      </div>
      <CtaLink href={HELLO_AGENT}>Continue with the Hello agent</CtaLink>
      <CtaLink href={handoffWhatsAppHref(offering, answers)} variant="secondary">
        Send this to Ram on WhatsApp
      </CtaLink>
      {boutique && (
        <CtaLink href={AAVARNA_DEMO} variant="outline">
          Try the Aavarna boutique
        </CtaLink>
      )}
      <p className="muted">
        Hello asks for a WhatsApp number next. The summary stays here so you can paste it.
      </p>
      <pre className="card summary">{message}</pre>
      <button type="button" className="btn btn-o" onClick={() => onCopy(message)}>
        {copyState === "copied"
          ? "Summary copied"
          : copyState === "failed"
            ? "Copy failed — select the summary above"
            : "Copy summary"}
      </button>
      <button type="button" onClick={onBack} className="kit-back">
        Change last answer
      </button>
      <button type="button" onClick={onReset} className="kit-back">
        Start again
      </button>
    </div>
  );
}
