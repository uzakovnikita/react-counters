import { useAppDispatch } from "../../../../hooks";
import { counterAdded } from "../../../../store/countersSlice";

const AddBtn = () => {
  const dispatch = useAppDispatch();
  const handleAddCounter = () => {
    dispatch(counterAdded());
  };

  return <button onClick={handleAddCounter}>Add counter</button>;
};

export default AddBtn;
