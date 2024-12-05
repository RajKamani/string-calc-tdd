import React, { useState } from "react";

const parseNumbers = (input: string):number => {
  if (!input) return 0;
  const numArray = input.split(/,|\\n/).map(Number);
  return numArray.reduce((sum, num) => sum + num, 0);
};

const StringCalculator: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const sum :number= parseNumbers(input);
    setResult(sum);
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
    </div>
  );
};

export default StringCalculator;
