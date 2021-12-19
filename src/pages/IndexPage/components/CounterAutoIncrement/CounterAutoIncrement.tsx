import { FunctionComponent, useEffect } from "react";
import { EntityId } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { counterIncremented, counterRemoved } from "../../../../store/countersSlice";

type Props = {
  id: EntityId;
};

const CounterAutoIncrement: FunctionComponent<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const counterValue = useAppSelector((state) => state.counters.entities[id]?.value);

  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch(counterIncremented(id));
    }, 1000);

    return () => {
      dispatch(counterRemoved(id));
      clearInterval(timerId);
    };
  }, []);

  const handleRemoveCounter = () => {
    dispatch(counterRemoved(id));
  };

  return (
    <div>
      {counterValue}
      <button onClick={handleRemoveCounter}>remove counter</button>
    </div>
  );
};

export default CounterAutoIncrement;
