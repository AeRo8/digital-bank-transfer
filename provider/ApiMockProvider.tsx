import React, { createContext, useContext, useReducer } from "react";

export interface ApiMockState {
  state: "success" | "insufficient funds" | "network issues";
}

export enum ApiMockType {
  SET_STATE = "SET_STATE",
}

type ApiMockStatePayload = { type: ApiMockType; payload: ApiMockState };

const INITIAL_STATE: ApiMockState = {
  state: "success",
};

const reducer = (
  state: ApiMockState,
  action: ApiMockStatePayload
): ApiMockState => {
  const { type, payload } = action;

  switch (type) {
    case ApiMockType.SET_STATE:
      return { ...state, ...payload };
    default:
      return state;
  }
};

const ApiMockContext = createContext<{
  apiMockState: ApiMockState;
  apiMockStateDispatch: React.Dispatch<ApiMockStatePayload>;
} | null>(null);

export const ApiMockProvider = ({ children }: any) => {
  const [apiMockState, apiMockStateDispatch] = useReducer(
    reducer,
    INITIAL_STATE
  );

  return (
    <ApiMockContext.Provider value={{ apiMockState, apiMockStateDispatch }}>
      {children}
    </ApiMockContext.Provider>
  );
};

export const useApiMockStateContext = () => {
  const context = useContext(ApiMockContext);

  if (!context) {
    throw new Error("ApiMockContext is not available");
  }

  return context;
};
