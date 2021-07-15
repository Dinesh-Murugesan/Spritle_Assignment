import "./App.css";
import constants from "./utils/constants";
import { useState } from "react";

function App() {
  let [amount, setAmount] = useState(0);
  let [details, setdetails] = useState([]);
  let [balance, setBalance] = useState(0);
  let [errorMessage, setErrorMessage] = useState("");

  const onClickHandler = (e) => {
    if (e.target.value === "Add") {
      setdetails([
        ...details,
        { [e.target.name]: e.target.value, time: new Date(), amount: amount },
      ]);
      setBalance(Number(balance) + Number(amount));
      setErrorMessage("");
    } else if (
      e.target.value === "Remove" &&
      Number(balance) - Number(amount) >= 0
    ) {
      setdetails([
        ...details,
        { [e.target.name]: e.target.value, time: new Date(), amount: amount },
      ]);
      setBalance(Number(balance) - Number(amount));
      setErrorMessage("");
    } else {
      setdetails([...details]);
      setErrorMessage(constants.eMessage);
    }
  };

  const onChangeHandler = (e) => {
    setAmount(e.target.value);
  };
  
  return (
    <div className="App">
      <div className="App-header">
        <h1>{constants.header}</h1>
      </div>
      <div className="Add-Expense">
        <span className="Balance">
          <strong>Balance : {balance}</strong>
        </span>
        <input
          style={{ border: "1px solid black", margin: "0 35%" }}
          value={amount}
          name="balance"
          onChange={(e) => onChangeHandler(e)}
          type="number"
          max={1000}
          min={1}
        />
        <div className="buttons">
          <button
            className="Add-btn"
            onClick={(e) => onClickHandler(e)}
            name="operation"
            value="Add"
          >
            Add
          </button>
          <button
            className="Remove-btn"
            onClick={(e) => onClickHandler(e)}
            name="operation"
            value="Remove"
          >
            Remove
          </button>
        </div>
        {errorMessage && errorMessage !== "" ? (
          <div style={{ color: "red" }}>{errorMessage}</div>
        ) : null}
      </div>
      <div className="Show-Expense">
        <div className="Transactions">
          <span className="Transaction-header">
            <strong>Transactions :</strong>
          </span>
          <div className="details">
            {details &&
              details.map((detail, key) => {
                return (
                  <span key={key}>{`${detail.time.toISOString()} - ${
                    detail.amount
                  } - ${detail.operation}`}</span>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
