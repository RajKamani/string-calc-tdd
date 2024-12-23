import React, { useState } from "react";
import "./StringCalculator.css";
import { calculateSum } from "./calculateSum";

const StringCalculator: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const { sum, error } = calculateSum(input);
    if (error) {
      setError(error);
      setResult(null);
    } else {
      setResult(sum);
      setError(null);
    }
  };

  return (
    <div className="calculator-container">
      <h1 className="calculator-header">String Calculator</h1>

      <input
        className="calculator-input"
        data-testid="input-box"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter string"
      />
      <button
        className="calculator-button"
        data-testid="calculate-button"
        onClick={handleCalculate}
      >
        Calculate
      </button>

      {result !== null && (
        <p
          data-testid="result-message"
          className="calculator-result result-text"
        >
          Result: {result}
        </p>
      )}
      {error && (
        <p
          data-testid="result-message"
          className="calculator-result error-text"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default StringCalculator;
