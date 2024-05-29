import { useState } from "react";

const Statistics = (props) => {
  console.log(props);
  const { good, neutral, bad } = props;
  const all = good + neutral + bad;
  const avg = (good + neutral + bad) / all;
  const pos = (good / all) * 100;
  return all !== 0 ? (
    <table>
      <tbody>
        <tr>
          <th>good</th>
          <td>{good}</td>
        </tr>
        <tr>
          <th>neutral</th>
          <td>{neutral}</td>
        </tr>
        <tr>
          <th>bad</th>
          <td>{bad}</td>
        </tr>
        <tr>
          <th>all</th>
          <td>{all}</td>
        </tr>
        <tr>
          <th>average</th>
          <td>{avg}</td>
        </tr>
        <tr>
          <th>positive</th>
          <td>{pos} %</td>
        </tr>
      </tbody>
    </table>
  ) : (
    <p>No feedback given</p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incState = (state, setState) => () => setState(state + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={incState(good, setGood)}>good</button>
      <button onClick={incState(neutral, setNeutral)}>neutral</button>
      <button onClick={incState(bad, setBad)}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
