import { EntityId } from "@reduxjs/toolkit";
import { useAppSelector } from ".";

const useCounterValue = (id: EntityId) => useAppSelector((state) => state.counters.entities[id]?.value);

export default useCounterValue;
