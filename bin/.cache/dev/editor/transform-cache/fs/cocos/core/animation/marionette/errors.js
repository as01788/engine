"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VariableTypeMismatchedError = exports.VariableNotDefinedError = exports.InvalidTransitionError = void 0;

class InvalidTransitionError extends Error {
  constructor(type) {
    super(`${type} transition is invalid`);
    this.name = 'TransitionRejectError';
  }

}

exports.InvalidTransitionError = InvalidTransitionError;

class VariableNotDefinedError extends Error {
  constructor(name) {
    super(`Graph variable ${name} is not defined`);
  }

}

exports.VariableNotDefinedError = VariableNotDefinedError;

class VariableTypeMismatchedError extends Error {
  constructor(name, expected, received) {
    super(`Expect graph variable ${name} to have type '${expected}' instead of received '${received !== null && received !== void 0 ? received : typeof received}'`);
  }

}

exports.VariableTypeMismatchedError = VariableTypeMismatchedError;