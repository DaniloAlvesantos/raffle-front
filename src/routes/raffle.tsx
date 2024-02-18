import { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import { createCard, createPix } from "../utils/payment";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import * as CardShad from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Notification } from "@/components/notification/notification";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  LinkPaymentPixProps,
  LinkPaymentCardProps,
  StocksProps,
  initialStateStocks,
  initialStateLink,
  initialStateLinkCard,
} from "@/types/raffle";

export function RafflePage() {
  const params = useParams();
  const id = params.id

  const [stocks, setStocks] = useState<StocksProps>({ ...initialStateStocks });
  const { user } = useAuth();

  const [amount, setAmount] = useState(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [select, setSelect] = useState("pix");
  const [link, setLink] = useState<LinkPaymentPixProps>({
    ...initialStateLink,
  });
  const [linkCard, setLinkCard] = useState<LinkPaymentCardProps>({
    ...initialStateLinkCard,
  });
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleBuy = async () => {
    if (user.cpf !== "" || user.cpf.length === 11) {
      const data = {
        title: stocks.name,
        description: stocks.description,
        amount,
        unit_price: stocks.price,
      };

      if (select === "card") {
        const cardResponse = await createCard({ ...data });
        console.log(cardResponse);
        return setLinkCard(cardResponse);
      }
      console.log(data)
      const payResponse = await createPix({ ...data });

      console.log(payResponse);
      setShow(true);
      return setLink(payResponse);
    }
    return navigate("/user");
  };

  const handleAmount = (number: number) => {
    if (amount <= 0) {
      setAmount(1);
    }
    setAmount(amount + number);
  };

  const handleConfirm = async () => {
    return navigate("/user");
  };

  useEffect(() => {
    const fetchRifa = async () => {
      try {
        const response = await api.get(`/rifas/${id}`); 
        setStocks(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados da rifa:', error);
      }
    };

    if (id) {
      fetchRifa();
    }
  
    if(!id) {
      fetchRifa()
    }

  }, [id]);

  const valor = stocks.price * amount;

  // useEffect(() => {
  //   const check = async () => {
  //     while (checkPay === true) {
  //       if (select === "pix") {
  //         const payment = await mercadoPago.get(`/v1/payments/${link.id}`);
  //         console.log(payment.data);
  //         // return setLink(payment.data);
  //       } else {
  //         const payment = await mercadoPago.get(`/v1/payments/${linkCard.id}`);
  //         // return setLinkCard(payment.data);
  //         console.log(payment.data);
  //       }
  //     }
  //   };

  //   check();
  //   return () => setCheckPay(false);
  // }, [link, linkCard]);

  return (
    <section className="min-h-screen font-Montserrat pb-20">
      <Suspense fallback="loading...">
        <header className="h-[20rem] sm:h-[35rem] sm:p-4">
          <img
            src={stocks.picture}
            className="w-full h-full object-cover object-[center_25%] sm:rounded"
            loading="eager"
          />
        </header>
        <main className="flex items-center justify-center flex-col my-2">
          <div className="bg-zinc-950 rounded p-4 w-[95%] sm:w-[38rem] md:w-[45rem] md:-mt-16 mb-2 text-center border-[1px]">
            <h2 className="font-medium text-lg text-center text-ellipsis">
              {stocks.name}
            </h2>
            <p className="text-sm my-2">{stocks.description}</p>
            <div className="flex flex-col items-center justify-center my-4">
              <p className="my-2">Quantidade: {amount}</p>
              <span className="grid grid-cols-2 grid-rows-2 gap-4 justify-items-center sm:w-[50%]">
                <Button
                  onClick={() => handleAmount(10)}
                  variant="outline"
                  className="border-green-500 w-32"
                >
                  10
                </Button>
                <Button
                  onClick={() => handleAmount(100)}
                  variant="outline"
                  className="border-green-500 w-32"
                >
                  100
                </Button>
                <Button
                  onClick={() => handleAmount(500)}
                  variant="outline"
                  className="border-green-500 w-32"
                >
                  500
                </Button>
                <Button
                  onClick={() => handleAmount(1000)}
                  variant="outline"
                  className="border-green-500 w-32"
                >
                  1000
                </Button>
              </span>
              <div>
                <Button
                  variant="destructive"
                  className="w-[17rem] sm:w-[20rem] my-2 bg-red-600 hover:bg-red-500"
                  onClick={() => setAmount(1)}
                >
                  Limpar
                </Button>
              </div>
              <p className="font-bold text-xl text-green-500 bg-zinc-800 rounded p-1 w-[17rem] sm:w-[20rem] ">
                R$ {valor.toFixed(2)}
              </p>
              <select
                onChange={(e) => setSelect(e.target.value)}
                className="w-[17rem] sm:w-[20rem] h-10 font-medium rounded my-2 border-2 text-zinc-100 dark:bg-dark-500 bg-zinc-900  outline-none"
              >
                <option
                  className="bg-white-primary dark:bg-dark-500 dark:text-white-primary outline-none font-oswald"
                  value="pix"
                >
                  PIX
                </option>
                <option
                  className="bg-white-primary dark:bg-dark-500 dark:text-white-primary outline-none font-oswald"
                  value="card"
                >
                  Cartão
                </option>
              </select>
            </div>
          </div>
          {stocks.status === "aberto" && (
            <>
              <Button
                onClick={handleBuy}
                className="bg-green-500 hover:bg-green-400 uppercase font-bold w-[95%] sm:w-[20rem]"
              >
                Comprar
              </Button>
              <Button
                onClick={handleConfirm}
                className="bg-emerald-500 hover:bg-emerald-400 uppercase font-bold w-[95%] sm:w-[20rem] my-2"
              >
                Confirmar Compra
              </Button>
            </>
          )}
          {linkCard?.init_point && (
            <a
              href={linkCard.init_point}
              target="_blank"
              className="w-[95%] sm:w-[20rem]"
            >
              <Button className="bg-blue-500 hover:bg-blue-400 text-zinc-100 my-2 font-bold w-full">
                Checkout Mercado Pago
              </Button>
            </a>
          )}

          {show && (
            <CardShad.Card className="w-[95%] sm:w-[20rem] flex flex-col items-center text-center justify-center my-4 font-Montserrat bg-zinc-900">
              <CardShad.CardHeader>
                <CardShad.CardTitle>Pix Gerado com Sucesso.</CardShad.CardTitle>
                <CardShad.CardDescription>
                  Não recarregue a página!
                </CardShad.CardDescription>
              </CardShad.CardHeader>
              <CardShad.CardContent>
                <img
                  src={`data:image/png;base64, ${link.point_of_interaction.transaction_data.qr_code_base64}`}
                  alt="qr code"
                  className="w-[12rem] h-[12rem] rounded"
                />
                <span className="flex flex-col gap-2 my-2">
                  <p>Copiar Rash: </p>
                  <Input
                    readOnly
                    value={link.point_of_interaction.transaction_data.qr_code}
                  />
                  <CopyToClipboard
                    text={link.point_of_interaction.transaction_data.qr_code}
                    onCopy={() => setCopied(true)}
                  >
                    <Button className="bg-green-500 hover:bg-green-400 w-48 font-bold uppercase">
                      Copiar
                    </Button>
                  </CopyToClipboard>
                  {copied && (
                    <Notification
                      title="Copiado"
                      description="Chave pix copiado com sucesso."
                      variant="default"
                    />
                  )}
                </span>
              </CardShad.CardContent>
            </CardShad.Card>
          )}
        </main>
      </Suspense>
    </section>
  );
}
