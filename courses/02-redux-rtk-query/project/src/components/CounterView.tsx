import { useAppDispatch,useAppSelector } from "../store/hooks";
import { increment,decrement } from "../store/slices/counterSlice";

const CounterView = () => {
  const count = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <div>
      <span data-testid="counter-value">{count}</span>
      <button data-testid= "increment-btn" onClick={()=>dispatch(increment())}>
        Increment
      </button>
      <button data-testid= "decrement-btn" onClick={()=>dispatch(decrement())}>
        decrement
      </button>
    </div>
  )
}