import assert from "node:assert/strict";
import test from "node:test";

import {
  type Answer,
  type OfferingId,
  handoffMessage,
  isBoutiquePath,
  nextQuestion,
  questionsFor,
} from "./qualify";
import { GIRI_PHONE_PLACEHOLDER, whatsAppHref } from "./site";

function choose(offering: OfferingId, picks: string[]) {
  const answers: Answer[] = [];
  for (const pick of picks) {
    const question = nextQuestion(offering, answers);
    assert.ok(question, `${offering} ran out of questions before ${pick}`);
    const option = question.options.find((item) => item.id === pick);
    assert.ok(option, `${question.id} has no option ${pick}`);
    answers.push({
      questionId: question.id,
      prompt: question.prompt,
      optionId: option.id,
      label: option.label,
    });
  }
  assert.equal(nextQuestion(offering, answers), null);
  return answers;
}

function allLengths(offering: OfferingId) {
  const lengths: number[] = [];
  const walk = (answers: Answer[]) => {
    const question = nextQuestion(offering, answers);
    if (!question) {
      lengths.push(answers.length);
      return;
    }
    for (const option of question.options) {
      walk([
        ...answers,
        {
          questionId: question.id,
          prompt: question.prompt,
          optionId: option.id,
          label: option.label,
        },
      ]);
    }
  };
  walk([]);
  return lengths;
}

test("boutiques always asks exactly two questions", () => {
  assert.deepEqual(new Set(allLengths("boutiques")), new Set([2]));
  assert.equal(choose("boutiques", ["whatsapp", "stock"]).length, 2);
});

test("shops asks two questions only on the boutique branch", () => {
  assert.deepEqual(new Set(allLengths("shops")), new Set([2, 4]));
  const boutique = choose("shops", ["boutique", "catalog"]);
  assert.equal(boutique.length, 2);
  assert.equal(isBoutiquePath("shops", boutique), true);
  assert.equal(choose("shops", ["grocery", "under30", "link", "whatsapp"]).length, 4);
  assert.equal(choose("shops", ["other", "large", "both", "both"]).length, 4);
});

test("other offerings use their own question counts, never five", () => {
  assert.deepEqual(new Set(allLengths("agents")), new Set([3]));
  assert.deepEqual(new Set(allLengths("bots")), new Set([4]));
  assert.deepEqual(new Set(allLengths("sites")), new Set([3]));
  for (const offering of ["boutiques", "agents", "bots", "shops", "sites"] as const) {
    for (const length of allLengths(offering)) {
      assert.notEqual(length, 5);
      assert.ok(length >= 2 && length <= 4);
    }
    assert.ok(questionsFor(offering, []).length >= 1);
  }
});

test("handoff goes to the Actionpackd WhatsApp and keeps the answers", () => {
  const answers = choose("boutiques", ["mix", "all"]);
  const message = handoffMessage("boutiques", answers);
  assert.match(message, /Offering: Boutiques/);
  assert.match(message, /A mix of these/);
  assert.match(message, /All three/);
  assert.equal(message.includes(GIRI_PHONE_PLACEHOLDER), false);
  const href = whatsAppHref(message);
  assert.ok(href.startsWith("https://wa.me/918190007072?text="));
});
