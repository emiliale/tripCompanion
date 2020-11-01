export const REQUEST_DATA = "REQUEST_DATA";
export const REQUEST_CHANGE = "REQUEST_CHANGE";
export const FINISH_REQUEST = "FINISH_REQUEST";
export const DENY_ACCESS = "DENY_ACCESS";

export function requestData(level = true) {
  return {
    type: REQUEST_DATA,
    level: level,
  };
}
export function requestChange() {
  return {
    type: REQUEST_CHANGE,
  };
}
export function finishRequest() {
  return {
    type: FINISH_REQUEST,
  };
}

export function denyAccess() {
  return {
    type: DENY_ACCESS,
  };
}
