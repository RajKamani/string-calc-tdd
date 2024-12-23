import { escapeRegex } from "./utils";

export const calculateSum = (
  input: string
): { sum: number; error?: string } => {
  if (!input) return { sum: 0 };
  const numArray = parseNumber(input);
  const negatives = checkNegatives(numArray);

  if (negatives.length) {
    return {
      sum: 0,
      error: `Negative numbers not allowed: ${negatives.join(", ")}`,
    };
  }
  return {
    sum: numArray
      .filter((num) => num <= 1000)
      .reduce((sum, num) => sum + num, 0),
  };
};

function parseNumber(input: string) {
  let delimiterString = ",|\\\\n";
  let delimiter;
  ({ input, delimiter } = findDelimiterAndNumber(input, delimiterString));
  return input.split(delimiter).map(Number);
}
function checkNegatives(numArray: number[]) {
  return numArray.filter((num) => num < 0);
}

function findDelimiterAndNumber(input: string, delimiter: string) {
  if (!input.startsWith("//")) {
    return { input, delimiter: new RegExp(delimiter) };
  }

  const multipleDelimiter = input.match(/^\/\/(\[.+\])\\n/);
  if (!multipleDelimiter) {
    return {
      input: extractNumbers(input),
      delimiter: new RegExp(`${input[2]}|${delimiter}`),
    };
  }
  const delimiters = multipleDelimiter[1]
    .match(/\[.*?\]/g)!
    .map((d) => d.slice(1, -1)); // Remove square brackets

  return {
    input: extractNumbers(input),
    delimiter: new RegExp(
      delimiters.map((d) => `(${escapeRegex(d)})`).join("|")
    ),
  };
}

function extractNumbers(input: string): string {
  return input.split("\\n")[1];
}
