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

test("modalClose set showModal false", () => {
  const startState = {
    showModal: true
  };

  const finState = modalClose(startState);

  expect(finState).toEqual({
    showModal: false
  });
});

describe("moveMonth", () => {
  it("lastMonth 5 to 4", () => {
    const startState = {
      "yy": 2017,
      "mm": 4
    }

    const finState = moveMonth(startState, -1);

    expect(finState).toEqual({
      "yy": 2017,
      "mm": 3
    });
  });
  it("nextMonth 6 to 7", () => {
    const startState = {
      "yy": 2017,
      "mm": 6
    }

    const finState = moveMonth(startState, 1);

    expect(finState).toEqual({
      "yy": 2017,
      "mm": 7
    });

  });
  it("lastMonth 1 to 12", () => {
    const startState = {
      "yy": 2017,
      "mm": 0
    }

    const finState = moveMonth(startState, -1);

    expect(finState).toEqual({
      "yy": 2016,
      "mm": 11
    });
  });
  it("nextMonth 12 to 1", () => {
    const startState = {
      "yy": 2017,
      "mm": 11
    }

    const finState = moveMonth(startState, 1);

    expect(finState).toEqual({
      "yy": 2018,
      "mm": 0
    });
  });
});

