import { useEffect, useState, Suspense } from "react";
import { api } from "@/api/api";
import { numbersProps } from "@/types/numbers";

export function UserInfo() {
  const [numbersBought, setNumbersBought] = useState<numbersProps[]>();

  useEffect(() => {
    const getNumbers = async () => {
      const numbers = await api.get("/numbers/user");
      const reponse = numbers.data;
      if (!reponse.ownNumbers) {
        return console.log("NADA");
      }

      setNumbersBought(reponse.ownNumbers);
    };

    getNumbers();
  }, []);

  return (
    <div className="w-full my-2 flex items-center justify-center flex-col scroll-smooth">
      <h1 className="text-center font-medium text-lg">Números Comprados</h1>
      <Suspense fallback="Loading">
        {numbersBought?.map((value) => (
          <div
            key={crypto.randomUUID()}
            className="bg-zinc-950 rounded-md border-[2px] m-3 md:flex-col flex sm:w-[50%] md:w-[20rem] items-center font-Montserrat"
          >
            <img
              src={value.Rifa.picture}
              className="w-24 h-24 md:w-full md:h-32 object-cover md:rounded-t object-[center_20%] rounded"
            />
            <span className="flex items-center flex-col w-full gap-2 px-4">
              <span className="my-2 w-full">
                <p className="text-sm w-[12rem] truncate sm:text-wrap">
                  {value.Rifa.name}
                </p>
                <p className="text-xs">Números: {value.numbers}</p>
                <p
                  className={`uppercase text-xs ${
                    value.Rifa.status === "aberto"
                      ? "bg-green-600"
                      : "bg-red-600"
                  } p-1.5 font-medium rounded w-[4rem] mt-2`}
                >
                  {value.Rifa.status}
                </p>
              </span>
            </span>
          </div>
        ))}
      </Suspense>
    </div>
  );
}
