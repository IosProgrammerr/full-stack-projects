import { useState } from "react";
import "./App.css";

function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");


  const handleClick = (value) => {
    setExpression(prev => prev + value)
  }
  const handleClear = () => {
  setExpression("");
  setResult("");
  }
  const handleCalculate = () => {
  try {
    setResult(eval(expression).toString()); {/* eval means here that we are changing strings into numbers */}
  } catch {
    setResult("Error");
  }
};


  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100 mt-2">
        <div className="card p-3 shadow" style={{ width: "320px" }}>
          <div className="text-center mb-3">
            <p className="fw-bold h2">React Calculator</p>
          </div>
          <div className="mb-3">
            <input type="text" className="form-control text-end" 
            value={expression}
            readOnly
            />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control text-end"
            value={result}
            readOnly/>
          </div>
          <div className="row g-2 mb-2">
            <div className="col-3">
              <button className="btn btn-outline-secondary w-100" onClick={() => handleClick("7")}>7</button>
            </div>
            <div className="col-3">
              <button className="btn btn-outline-secondary w-100" onClick={() => handleClick("8")}>8</button>
            </div>
            <div className="col-3">
              <button className="btn btn-outline-secondary w-100" onClick={() => handleClick("9")}>9</button>
            </div>
            <div className="col-3">
              <button className="btn btn-outline-primary w-100" onClick={() => handleClick("/")}>/</button>
            </div>
          </div>

          <div className="row g-2 mb-2">
            <div className="col-3">
              <button className="btn btn-outline-secondary w-100" onClick={() => handleClick("4")}>4</button>
            </div>
            <div className="col-3">
              <button className="btn btn-outline-secondary w-100" onClick={() => handleClick("5")}>5</button>
            </div>
            <div className="col-3">
              <button className="btn btn-outline-secondary w-100" onClick={() => handleClick("6")}>6</button>
            </div>
            <div className="col-3">
              <button className="btn btn-outline-primary w-100" onClick={() => handleClick("*")}>*</button>
            </div>
          </div>
          <div className="row g-2  mb-2">
            <div className="col-3">
              <button className="btn btn-outline-secondary w-100" onClick={() => handleClick("1")}>1</button>
            </div>
            <div className="col-3">
              <button className="btn btn-outline-secondary w-100" onClick={() => handleClick("2")}>2</button>
            </div>
            <div className="col-3">
              <button className="btn btn-outline-secondary w-100" onClick={() => handleClick("3")}>3</button>
            </div>
            <div className="col-3">
              <button className="btn btn-outline-primary w-100" onClick={() => handleClick("-")}>-</button>
            </div>
          </div>
          <div className="row g-2  mb-2">
            <div className="col-3">
              <button className="btn btn-outline-secondary w-100" onClick={() => handleClick("0")}>0</button>
            </div>
            <div className="col-3">
              <button className="btn btn-outline-primary w-100" onClick={() => handleClick("+")}>+</button>
            </div>
            <div className="col-3">
              <button className="btn btn-success w-100" onClick={handleCalculate}>=</button>
            </div>
            <div className="col-3">
              <button className="btn btn-danger w-100" onClick={() => handleClear()}>Clear</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
