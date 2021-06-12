import React, { useState } from "react";

const Statistic = ({ text, value }) => (
  <tr>
    <td> {text} </td>
    <td> {value} </td>
  </tr>
);

const Button = ({ text, handler }) => <button onClick={handler}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  const getAll = () => good + neutral + bad;
  const getAverage = () => (good - bad) / getAll();
  const getPerc = () => (100 * good) / getAll();
  if (getAll() === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p> No feedback given</p>
      </>
    );
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text={"good"} value={good} />
          <Statistic text={"neutral"} value={neutral} />
          <Statistic text={"bad"} value={bad} />
          <Statistic text={"all"} value={getAll()} />
          <Statistic text={"average"} value={getAverage()} />
          <Statistic text={"positive"} value={`${getPerc()}%`} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} handler={() => setGood(good + 1)} />
      <Button text={"neutral"} handler={() => setNeutral(neutral + 1)} />
      <Button text={"bad"} handler={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
