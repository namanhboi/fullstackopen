import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const DisplayCounter = ({ count }) => (
  <>
    <p>The count is {count}</p>
  </>
);

const Button = ({ text, onClick }) => (
  <>
    <button onClick={onClick}>{text}</button>
  </>
);

function App() {
  const [count, setCount] = useState(0);
  const [allClicks, setAllClicks] = useState([""]);
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);

  const leftClick = () => {
    setLeftCount(leftCount + 1);
    setCount(count + 1);
    setAllClicks(allClicks.concat(["L"]));
  };
  const rightClick = () => {
    setRightCount(rightCount + 1);
    setCount(count + 1);
    setAllClicks(allClicks.concat(["R"]));
  };
  return (
    <>
      <div>
        <DisplayCounter count={count} />
        <p>
          Left Count is {leftCount}. Right Count is {rightCount}
        </p>
        <Button text="L" onClick={leftClick} />
        <Button text="R" onClick={rightClick} />
        {console.log(allClicks)}
        <p>{allClicks.join(" ")}</p>
      </div>
    </>
  );
}

export default App;
