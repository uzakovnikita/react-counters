import { createEntityAdapter, createSlice, EntityId, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { numberOfAutoIncrement } from "../contants";

type Counter = {
  value: number;
  id: EntityId;
  isAutoIncrement: boolean;
};

type ActionWithIdPaylod = PayloadAction<EntityId>;

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
      const isAutoIncrement = (state.ids.length + 1) % numberOfAutoIncrement === 0;

      countersAdapter.addOne(state, { value: prevCountersValue, id: v4(), isAutoIncrement });
    },
    counterRemoved: (state, action: ActionWithIdPaylod) => {
      countersAdapter.removeOne(state, action.payload);
    },
    counterIncremented: (state, action: ActionWithIdPaylod) => {
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
    counterDecremented: (state, action: ActionWithIdPaylod) => {
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
