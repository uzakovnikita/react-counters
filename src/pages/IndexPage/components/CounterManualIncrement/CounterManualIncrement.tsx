import { FunctionComponent } from "react";
import { EntityId } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { counterIncremented, counterDecremented, counterRemoved } from "../../../../store/countersSlice";

type Props = {
  id: EntityId;
};

const CounterManualIncrement: FunctionComponent<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const counterValue = useAppSelector((state) => state.counters.entities[id]?.value);

  const handleIncrement = () => {
    dispatch(counterIncremented(id));
  };

  const handleDecrement = () => {
    dispatch(counterDecremented(id));
  };

  const handleDelete = () => {
    dispatch(counterRemoved(id));
  };

  return (
    <div>
      {counterValue}
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleDelete}>remove counter</button>
    </div>
  );
};

export default CounterManualIncrement;
