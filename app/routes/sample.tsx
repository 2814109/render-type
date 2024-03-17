import { TRIPLE, user } from "~/constants";
import { useUser } from "~/hooks/useUser";

export default function Index() {
  const { handleClick, handleReset, handleChangeAge, handleChangeName, state } =
    useUser();

  return (
    <>
      <p>Profile</p>
      <div>Default : {JSON.stringify(user)}</div>
      <div>{JSON.stringify(state)}</div>
      <div>
        <label htmlFor="user-name">Name</label>
        <input id="user-name" value={state.name} onChange={handleChangeName} />
      </div>

      <div>
        <label htmlFor="user-age">Age</label>
        <input
          id="user-age"
          value={state.age}
          type="number"
          onChange={handleChangeAge}
        />
      </div>

      <p>multiplication : {TRIPLE}</p>
      <button onClick={handleClick}>GrowUp</button>
      <button onClick={handleReset}>Reset</button>
      <p>{state.age}</p>
    </>
  );
}
