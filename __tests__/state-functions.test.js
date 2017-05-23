import { modalOpen, modalClose, moveMonth } from "../src/state-functions.js";

test("modalOpen set showModal true", () => {
  const startState = {
    showModal: false
  };

  const finState = modalOpen(startState);

  expect(finState).toEqual({
    showModal: true
  });
});

