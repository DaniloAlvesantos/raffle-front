import { raffleProps } from "./home";

export interface numbersProps {
    Rifa: raffleProps;
    id:string;
    numbers: Array<number>;
    participantId: string;
    rifaId:string;
}