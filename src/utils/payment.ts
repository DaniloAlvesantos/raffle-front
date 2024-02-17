import { api } from "../api/api";

interface PixProps {
  title: string;
  description: string;
  amount: number;
  unit_price: number;
}

interface CardProps {
  title: string;
  description: string;
  unit_price: number;
  amount: number;
}

export async function createPix(props: PixProps) {
  const body = { ...props };

  const createPayment = await api.post("/create/payment/pix", body);
  const paymentResponse = createPayment.data;

  return paymentResponse;
}

export async function createCard(props: CardProps) {
  const body = { ...props };

  const createCardPayment = await api.post(
    "create/payment/preference",
    body
  );
  const paymentCardResponse = createCardPayment.data;

  return paymentCardResponse;
}
