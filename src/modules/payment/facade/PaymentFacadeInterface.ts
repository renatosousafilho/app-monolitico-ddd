export type CreatePaymentFacadeInput = {
  amount: number;
  orderId: string;
};

export type CreatePaymentFacadeOutput = {
  transactionId: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export default interface PaymentFacadeInterface {
  process(input: CreatePaymentFacadeInput): Promise<CreatePaymentFacadeOutput>;
}