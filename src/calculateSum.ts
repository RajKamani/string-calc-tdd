import { escapeRegex } from "./utils";

export const calculateSum = (
  input: string
): { sum: number; error?: string } => {
  if (!input) return { sum: 0 };

  let delimiter = /,|\\n/;
  ({ input, delimiter } = findDelimiterAndNumber(input, delimiter));
  const numArray = input.split(delimiter).map(Number);
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

function checkNegatives(numArray: number[]) {
  return numArray.filter((num) => num < 0);
}

function findDelimiterAndNumber(input: string, delimiter: RegExp) {
  if (!input.startsWith("//")) {
    return { input, delimiter };
  }

  const multipleDelimiter = input.match(/^\/\/(\[.+\])\\n/);
  if (!multipleDelimiter) {
    return {
      input: extractNumbers(input),
      delimiter: new RegExp(input[2]),
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
