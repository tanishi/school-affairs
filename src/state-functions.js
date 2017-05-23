"use strict";

export function modalOpen(state){
  state.showModal = true;

  return state;
}

export function modalClose(state){
  state.showModal = false;

  return state;
}

export function moveMonth(state, idx){
  if (state.mm + idx < 0){
    state.yy--;
    state.mm = 11;
  }
  else if (state.mm + idx > 11){
    state.yy++;
    state.mm = 0;
  }
  else {
    state.mm += idx;
  }

  return state;
}

