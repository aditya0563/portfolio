import React, { useState } from "react";
import { FaBackspace } from "react-icons/fa";
import { HiOutlineCalculator } from "react-icons/hi";

export default function CalculatorApp({ onClose }) {
  const [display, setDisplay] = useState("0");         // Bottom active input
  const [expression, setExpression] = useState("");     // Top history display
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // Helper to prevent long floating point decimals
  const formatResult = (num) => {
    if (typeof num === "string") return num;
    const precision = 1000000000;
    return String(Math.round(num * precision) / precision);
  };

  // Perform calculation
  const calculate = (first, second, op) => {
    switch (op) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "×":
        return first * second;
      case "÷":
        return second === 0 ? "Error" : first / second;
      default:
        return second;
    }
  };

  // Input Digit (0-9)
  const inputDigit = (digit) => {
    if (waitingForOperand || display === "Error") {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(digit) : display + digit);
    }
  };

  // Input Decimal (.)
  const inputDot = () => {
    if (waitingForOperand || display === "Error") {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  // Clear / All Clear
  const clearAll = () => {
    setDisplay("0");
    setExpression("");
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  // Backspace
  const backspace = () => {
    if (waitingForOperand || display === "Error") return;

    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  // Toggle Plus / Minus (+/-)
  const toggleSign = () => {
    if (display === "Error") return;
    const val = parseFloat(display);
    if (!isNaN(val)) {
      setDisplay(formatResult(val * -1));
    }
  };

  // Percentage (%)
  const inputPercent = () => {
    if (display === "Error") return;
    const val = parseFloat(display);
    if (!isNaN(val)) {
      setDisplay(formatResult(val / 100));
    }
  };

  // Operations (+, -, ×, ÷)
  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (display === "Error") {
      clearAll();
      return;
    }

    if (prevValue == null) {
      setPrevValue(inputValue);
      setExpression(`${inputValue} ${nextOperation}`);
    } else if (operation && !waitingForOperand) {
      const result = calculate(prevValue, inputValue, operation);
      const formatted = formatResult(result);
      
      setPrevValue(result === "Error" ? null : parseFloat(formatted));
      setExpression(`${formatted} ${nextOperation}`);
    } else {
      setExpression(`${prevValue} ${nextOperation}`);
    }

    setDisplay("0");
    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  // Equals (=)
  const handleEquals = () => {
    if (!operation || prevValue == null) return;

    const inputValue = parseFloat(display);
    setExpression(`${prevValue} ${operation} ${inputValue} =`);

    const result = calculate(prevValue, inputValue, operation);
    const formatted = formatResult(result);

    setDisplay(formatted);
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  return (
    <div className="w-full h-full bg-black text-white flex flex-col justify-between select-none font-sans px-4 pt-12 sm:pt-4 pb-6 overflow-hidden">
      
      {/* Top Header: Calculator Icon on the top right below the status bar */}
      <div className="flex justify-end items-center px-2 pt-2 pb-1">
        <button className="w-9 h-9 rounded-full bg-zinc-900 flex items-center justify-center text-white/80 hover:text-white transition-colors">
          <HiOutlineCalculator className="w-5 h-5" />
        </button>
      </div>

      {/* Screen Display */}
      <div className="flex flex-col items-end justify-end px-2 mb-2 min-h-[90px]">
        <span className="text-xs text-zinc-400 font-medium tracking-wide h-5 overflow-x-auto whitespace-nowrap text-right w-full scrollbar-none">
          {expression}
        </span>
        <span className="text-6xl font-light tracking-normal text-right w-full overflow-x-auto whitespace-nowrap scrollbar-none">
          {display}
        </span>
      </div>

      {/* Calculator Buttons Grid */}
      <div className="grid grid-cols-4 gap-3.5 w-full max-w-[340px] mx-auto pb-2">
        
        {/* Row 1 */}
        <button
          onClick={backspace}
          className="w-full aspect-square rounded-full bg-[#505050] hover:bg-[#686868] text-white text-xl font-medium flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          <FaBackspace className="w-5 h-5" />
        </button>
        <button
          onClick={clearAll}
          className="w-full aspect-square rounded-full bg-[#505050] hover:bg-[#686868] text-white text-xl font-medium flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          {display !== "0" || expression !== "" ? "C" : "AC"}
        </button>
        <button
          onClick={inputPercent}
          className="w-full aspect-square rounded-full bg-[#505050] hover:bg-[#686868] text-white text-xl font-medium flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          %
        </button>
        <button
          onClick={() => performOperation("÷")}
          className={`w-full aspect-square rounded-full text-2xl font-medium flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm ${
            operation === "÷" && waitingForOperand
              ? "bg-white text-[#FF9F0A]"
              : "bg-[#FF9F0A] hover:bg-[#ffb03a] text-white"
          }`}
        >
          ÷
        </button>

        {/* Row 2 */}
        <button
          onClick={() => inputDigit(7)}
          className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#444444] text-white text-2xl font-normal flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          7
        </button>
        <button
          onClick={() => inputDigit(8)}
          className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#444444] text-white text-2xl font-normal flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          8
        </button>
        <button
          onClick={() => inputDigit(9)}
          className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#444444] text-white text-2xl font-normal flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          9
        </button>
        <button
          onClick={() => performOperation("×")}
          className={`w-full aspect-square rounded-full text-2xl font-medium flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm ${
            operation === "×" && waitingForOperand
              ? "bg-white text-[#FF9F0A]"
              : "bg-[#FF9F0A] hover:bg-[#ffb03a] text-white"
          }`}
        >
          ×
        </button>

        {/* Row 3 */}
        <button
          onClick={() => inputDigit(4)}
          className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#444444] text-white text-2xl font-normal flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          4
        </button>
        <button
          onClick={() => inputDigit(5)}
          className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#444444] text-white text-2xl font-normal flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          5
        </button>
        <button
          onClick={() => inputDigit(6)}
          className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#444444] text-white text-2xl font-normal flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          6
        </button>
        <button
          onClick={() => performOperation("-")}
          className={`w-full aspect-square rounded-full text-2xl font-medium flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm ${
            operation === "-" && waitingForOperand
              ? "bg-white text-[#FF9F0A]"
              : "bg-[#FF9F0A] hover:bg-[#ffb03a] text-white"
          }`}
        >
          −
        </button>

        {/* Row 4 */}
        <button
          onClick={() => inputDigit(1)}
          className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#444444] text-white text-2xl font-normal flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          1
        </button>
        <button
          onClick={() => inputDigit(2)}
          className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#444444] text-white text-2xl font-normal flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          2
        </button>
        <button
          onClick={() => inputDigit(3)}
          className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#444444] text-white text-2xl font-normal flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          3
        </button>
        <button
          onClick={() => performOperation("+")}
          className={`w-full aspect-square rounded-full text-2xl font-medium flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm ${
            operation === "+" && waitingForOperand
              ? "bg-white text-[#FF9F0A]"
              : "bg-[#FF9F0A] hover:bg-[#ffb03a] text-white"
          }`}
        >
          +
        </button>

        {/* Row 5 */}
        <button
          onClick={toggleSign}
          className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#444444] text-white text-xl font-normal flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          +/−
        </button>
        <button
          onClick={() => inputDigit(0)}
          className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#444444] text-white text-2xl font-normal flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          0
        </button>
        <button
          onClick={inputDot}
          className="w-full aspect-square rounded-full bg-[#333333] hover:bg-[#444444] text-white text-2xl font-normal flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          .
        </button>
        <button
          onClick={handleEquals}
          className="w-full aspect-square rounded-full bg-[#FF9F0A] hover:bg-[#ffb03a] text-white text-2xl font-medium flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
        >
          =
        </button>
      </div>
    </div>
  );
}