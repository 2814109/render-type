import { user } from "~/constants";
import { useMultiplication } from "~/hooks/useMultiplication";
import { useUser } from "~/hooks/useUser";
import { FlexContainer } from "~/styles/FlexContainer";

export default function Index() {
  const {
    handleCountUp,
    handleCountDown,
    handleReset: handleResetMultiplication,
    state: multiplication,
  } = useMultiplication();

  const { handleClick, handleReset, handleChangeAge, handleChangeName, state } =
    useUser(multiplication.count);

  return (
    <>
      <p>Profile</p>
      <div>Default : {JSON.stringify(user)}</div>
      <FlexContainer>
        {JSON.stringify(state)}
        <button onClick={handleReset}>Reset</button>
      </FlexContainer>
      <div>
        <label htmlFor="user-name">Name</label>
        <input id="user-name" value={state.name} onChange={handleChangeName} />
      </div>

      <FlexContainer>
        <label htmlFor="user-age">Age</label>
        <input
          id="user-age"
          value={state.age}
          type="number"
          onChange={handleChangeAge}
        />
        <button onClick={handleClick}>GrowUp</button>
      </FlexContainer>
      <FlexContainer>
        <p>multiplication : {multiplication.count}</p>
        <button onClick={handleCountUp}>CountUp</button>
        <button onClick={handleCountDown}>CountDown</button>
        <button onClick={handleResetMultiplication}>Reset</button>
      </FlexContainer>
    </>
  );
}
