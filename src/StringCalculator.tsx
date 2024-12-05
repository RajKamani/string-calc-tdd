import React, { useState } from "react";

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const parseNumbers = (input: string): { sum: number; error?: string } => {
  if (!input) return { sum: 0 };

  let delimiter = /,|\\n/;
  if (input.startsWith("//")) {
    const delimiterPart = input.match(/^\/\/(\[.+\])\\n/);
    if (delimiterPart) {
      const delimiters = delimiterPart[1]
        .match(/\[.*?\]/g)!
        .map((d) => d.slice(1, -1)); // Remove square brackets
      delimiter = new RegExp(
        delimiters.map((d) => `(${escapeRegex(d)})`).join("|")
      );
      input = input.split("\\n")[1];
    } else {
      delimiter = new RegExp(input[2]); // Single character delimiter
      input = input.split("\\n")[1];
    }
  }
  const numArray = input.split(delimiter).map(Number);
  const negatives = numArray.filter((num) => num < 0);

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

const StringCalculator: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const { sum, error } = parseNumbers(input);
    if (error) {
      setError(error);
      setResult(null);
    } else {
      setResult(sum);
      setError(null);
    }
  };

  return (
    <div>
      <h1>String Calculator</h1>
      <input
        data-testid="input-box"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter string"
      />
      <button data-testid="calculate-button" onClick={handleCalculate}>
        Calculate
      </button>

      {result !== null && <p data-testid="result-message">Result: {result}</p>}
      {error && (
        <p data-testid="result-message" style={{ color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default StringCalculator;
