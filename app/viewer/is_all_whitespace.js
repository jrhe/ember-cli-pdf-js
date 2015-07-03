var NonWhitespaceRegexp = /\S/;

export default function isAllWhitespace(str) {
  return !NonWhitespaceRegexp.test(str);
};
