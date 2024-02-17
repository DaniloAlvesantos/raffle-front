import { Suspense, useEffect, useMemo, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { CardRaffle } from "@/components/cardRaffle/cardRaffle";
import { raffleProps } from "@/types/home"

export function HomePage() {
  const [raffle, setRaffle] = useState([]);

  const getRaffles = useMemo(async () => {
    await api.get("/rifas").then((data) => {
      setRaffle(data.data);
      console.log(data.data);
    });
  }, []);

  const navigate = useNavigate();

  useEffect(() => {}, [getRaffles]);

  return (
    <div className="min-h-screen w-full p-4">
      <header className=" h-[10rem] w-full bg-[url('https://waypremios.com/wp-content/uploads/2023/09/rifa-capa.png')] bg-cover bg-center rounded">
      </header>
      <section className="flex flex-col md items-center justify-center">
        <Suspense>
          {raffle.map((value: raffleProps) => (
            <a
              key={crypto.randomUUID()}
              onClick={() => navigate(`/stocks/${value.id}`)}
              className="cursor-pointer"
            >
              <CardRaffle {...value} />
            </a>
          ))}
        </Suspense>
      </section>
    </div>
  );
}
