type PaymentResponse = {
  success: boolean;
  message: string;
};

export const transferPayment = async ({
  success,
  message,
}: PaymentResponse): Promise<PaymentResponse> => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve({
        success,
        message,
      });
    }, 2000)
  );
};
