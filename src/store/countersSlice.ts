import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

type Counter = number;

const countersAdapter = createEntityAdapter<Counter>({});

const countersSlice = createSlice({
  name: "counters",
  initialState: countersAdapter.getInitialState(),
  reducers: {
    counterAdded: (state) => {
      const prevCountersValue = state.ids.reduce((acc, id) => {
        const newAcc = (acc as unknown as number) + Number(state.entities[id]);

        return newAcc;
      }, 0) as number;

      countersAdapter.addOne(state, prevCountersValue);
    },
    counterRemoved: countersAdapter.removeOne,
    counterIncremented: countersAdapter.updateOne,
  },
});

export const { counterAdded, counterRemoved, counterIncremented } = countersSlice.actions;
export const { reducer } = countersSlice;
