import { useState } from "react";

const AnecdoteOTD = ({ anecdote, votes, onClickVote, onClickGenerate }) => {
  return (
    <div>
      <h1>Anecdote Of The Day</h1>
      <p>{anecdote}</p>
      <p>has {votes} vote(s)</p>
      <button onClick={onClickVote}>vote</button>
      <button onClick={onClickGenerate}>next anecdote</button>
    </div>
  );
};

const PopularAnecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdote}</p>
      <p>has {votes} vote(s)</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [selected, setSelected] = useState(
    Math.round(Math.random() * (anecdotes.length - 1))
  );
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  });
  const rng = () => {
    setSelected(Math.round(Math.random() * (anecdotes.length - 1)));
  };

  const incVote = (index) => () =>
    setVotes({
      ...votes,
      [index.toString()]: votes[index.toString()] + 1,
    });
  let curr_max = 0;
  let curr_max_index = selected.toString();
  for (const num in votes) {
    if (curr_max < votes[num]) {
      curr_max = votes[num];
      curr_max_index = num;
    }
  }
  return (
    <>
      <AnecdoteOTD
        anecdote={anecdotes[selected]}
        votes={votes[selected.toString()]}
        onClickVote={incVote(selected)}
        onClickGenerate={rng}
      ></AnecdoteOTD>
      <PopularAnecdote anecdote={anecdotes[curr_max_index]} votes={curr_max} />
    </>
  );
};

export default App;
