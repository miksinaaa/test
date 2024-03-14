import { configureStore } from "@reduxjs/toolkit";
import { reducer as Reducer } from "./test.slice";

const store = configureStore({
  reducer: {
    companies: Reducer,
  },
});

export type TypeRootState = ReturnType<typeof store.getState>;

export default store;
