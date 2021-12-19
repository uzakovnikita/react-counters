import { createEntityAdapter, createSlice, EntityId, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

type Counter = {
  value: number;
  id: EntityId;
  autoIncrement: boolean;
};

const countersAdapter = createEntityAdapter<Counter>({});

const countersSlice = createSlice({
  name: "counters",
  initialState: countersAdapter.getInitialState(),
  reducers: {
    counterAdded: (state) => {
      const prevCountersValue = state.ids.reduce((acc, id) => {
        const newAcc = (acc as unknown as number) + Number(state.entities[id]?.value);

        return newAcc;
      }, 0) as number;
      const autoIncrement = (state.ids.length + 1) % 4 === 0;

      countersAdapter.addOne(state, { value: prevCountersValue, id: v4(), autoIncrement });
    },
    counterRemoved: (state, action: PayloadAction<EntityId>) => {
      countersAdapter.removeOne(state, action.payload);
    },
    counterIncremented: (state, action: PayloadAction<EntityId>) => {
      const currentValue = state.entities[action.payload]?.value;
      if (typeof currentValue === "number") {
        countersAdapter.updateOne(state, {
          id: action.payload,
          changes: {
            value: currentValue + 1,
          },
        });
      }
    },
    counterDecremented: (state, action: PayloadAction<EntityId>) => {
      const currentValue = state.entities[action.payload]?.value;
      if (typeof currentValue === "number") {
        countersAdapter.updateOne(state, {
          id: action.payload,
          changes: {
            value: currentValue - 1,
          },
        });
      }
    },
  },
});

export const { counterAdded, counterRemoved, counterIncremented, counterDecremented } = countersSlice.actions;
export const { reducer } = countersSlice;
