import React, { createContext, useContext, useReducer } from "react";

export interface PaymentState {
  balance: number;
  recipientSuccessInfo?: {
    name: string;
    bank: string;
    bankAccountNumber: string;
    paymentAmount: number;
    note?: string;
  };
}

export enum PaymentType {
  SET_BALANCE = "SET_BALANCE",
  SET_RECIPIENT = "SET_RECIPIENT",
}

type PaymentPayload =
  | { type: PaymentType.SET_BALANCE; payload: PaymentState["balance"] }
  | {
      type: PaymentType.SET_RECIPIENT;
      payload: PaymentState["recipientSuccessInfo"];
    };

const INITIAL_STATE: PaymentState = {
  balance: 2_000,
};

const reducer = (state: PaymentState, action: PaymentPayload): PaymentState => {
  const { type, payload } = action;

  switch (type) {
    case PaymentType.SET_BALANCE:
      return { ...state, ...{ balance: payload } };
    case PaymentType.SET_RECIPIENT: {
      return { ...state, recipientSuccessInfo: payload };
    }
    default:
      return state;
  }
};

const PaymentContext = createContext<{
  paymentState: PaymentState;
  paymentDispatch: React.Dispatch<PaymentPayload>;
} | null>(null);

export const PaymentProvider = ({ children }: any) => {
  const [paymentState, paymentDispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <PaymentContext.Provider
      value={{
        paymentState,
        paymentDispatch,
      }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);

  if (!context) {
    throw new Error("PaymentContext is not available");
  }

  return context;
};
