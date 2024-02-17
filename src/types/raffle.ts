export interface StocksProps {
  id?: string;
  name: string;
  description: string;
  numbersQuantity: number;
  reward: string;
  startedAt: Date | string;
  status: string;
  price: number;
  picture: string;
}

export const initialStateStocks = {
  name: "",
  description: "",
  numbersQuantity: 0,
  reward: "",
  picture: "",
  price: 0,
  startedAt: "",
  status: "",
};

export interface LinkPaymentPixProps {
  id: number;
  point_of_interaction: {
    transaction_data: {
      qr_code_base64: string;
      qr_code: string;
    };
  };
  status: "pending" | "approved" | "cancelled";
}

export interface LinkPaymentCardProps {
  id: string;
  init_point: string;
  status: "pending" | "approved" | "cancelled";
}

export const initialStateLinkCard: LinkPaymentCardProps = {
  id:"",
  init_point:"",
  status:"approved"
}

export const initialStateLink: LinkPaymentPixProps = {
  id: 0,
  point_of_interaction:{
    transaction_data: {
      qr_code:"",
      qr_code_base64:""
    }
  },
  status: "pending",
};
