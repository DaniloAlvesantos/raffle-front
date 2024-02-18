import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface CardRaffleProps {
  name: string;
  description: string;
  picture: string;
  reward: string;
  startedAt: string;
  status: string;
}

export const CardRaffle: React.FC<CardRaffleProps> = (props) => {
  const { description, name, reward, startedAt, status, picture } = props;
  console.log(picture);
  const startedAtDate = new Date(startedAt)
  return (
    <Card className="w-[18rem] sm:h-auto  md:w-[36rem] my-4 font-Montserrat text-base">
      <CardHeader className="p-4">
        <CardTitle>
          <div className="relative">
            <img
              src={picture}
              loading="eager"
              className="w-full h-[10rem] md:h-[15rem] object-cover object-[center_22%] rounded-sm"
              alt="image rifa"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
          </div>
          <p className="overflow-clip">{name}</p>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="p-4">
        <ul className="text-xs md:text-sm">
          <li>Prêmio: {reward}</li>
          <li>
            {
              status === "aberto" ? "" : startedAtDate.toLocaleDateString()
            }
          </li>
          <li className={`${status === "fechado" ? "bg-red-600 p-2 rounded" : "bg-green-500 p-2 rounded"} w-[8rem] text-center uppercase mt-2 font-medium`}>{status}</li>
        </ul>
      </CardContent>
    </Card>
  );
};
