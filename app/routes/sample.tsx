import { TRIPLE } from "~/constants";
import { useCount } from "~/hooks/useCount";

export default function Index() {
  const { handleClick, handleReset, dispatch, state } = useCount();

  return (
    <>
      <p>Profile</p>
      <div>{JSON.stringify(state)}</div>
      <div>
        <label htmlFor="user-name">Name</label>
        <input
          id="user-name"
          value={state.name}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_NAME",
              payload: e.currentTarget.value,
            })
          }
        />
      </div>

      <div>
        <label htmlFor="user-age">Age</label>
        <input
          id="user-age"
          value={state.age}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_AGE",
              payload: Number(e.currentTarget.value),
            })
          }
        />
      </div>

      <p>multiplication : {TRIPLE}</p>
      <button onClick={handleClick}>GrowUp</button>
      <button onClick={handleReset}>Reset</button>
      <p>{state.age}</p>
    </>
  );
}
