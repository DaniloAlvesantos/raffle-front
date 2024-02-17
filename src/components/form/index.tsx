// import { FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Toaster } from "../ui/toaster";
import { useToast } from "../ui/use-toast";
import { FaGoogle } from "react-icons/fa";
import { Notification } from "../notification/notification";

interface InfoProps {
  cpf: string;
  number: string;
}

export function Form() {
  const { Login, userErr, CreateUser, setUser, user } = useAuth();
  const { toast } = useToast();
  const [info, setInfo] = useState<InfoProps>({
    cpf: "",
    number: "",
  });

  function handleSubmitCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (info.cpf.length > 11 || info.cpf.length < 11) {
      return toast({
        title: "CPF invalido.",
        description: "Revise o CPF.",
      });
    }

    if (!info.number) {
      return toast({
        title: "Telefone invalido",
        description: "Revise o Telefone",
      });
    }
    setUser({ ...info });
    CreateUser();
  }

  useEffect(() => {
    console.log(user)
  })

  return (
    <form
      onSubmit={handleSubmitCreate}
      className="font-Montserrat p-4 flex flex-col items-center"
    >
      <Tabs defaultValue="account" className="">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Login</TabsTrigger>
          <TabsTrigger value="password">Cadastrar</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Já é um participante ? Faça login com a google direto.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2"></CardContent>
            <CardFooter>
              <Button onClick={Login} type="button" className="gap-2">
                Fazer login com google
                <FaGoogle color="#121212" width={24} height={24} />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Cadastrar</CardTitle>
              <CardDescription>
                Cadastre-se como um usuario em nossa plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <span>
                <Label>CPF</Label>
                <Input
                  onChange={(e) => setInfo({ ...info, cpf: e.target.value })}
                  className="w-[14rem] font-Montserrat font-medium"
                  placeholder="Digite seu CPF..."
                />
              </span>
              <span>
                <Label>Número de Telefone</Label>
                <Input
                  onChange={(e) => setInfo({ ...info, number: e.target.value })}
                  className="w-[14rem] font-Montserrat font-medium"
                  placeholder="Digite seu número..."
                />
              </span>
            </CardContent>
            <CardFooter>
              <Button
                disabled={info.number.length <= 5}
                type="submit"
                className="gap-2"
              >
                Fazer login com google
                <FaGoogle color="#121212" width={24} height={24} />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {userErr ? <Notification title="Login" description="Erro ao cadastrar/login." variant="destructive" duration={10000} /> : <Toaster />}
    </form>
  );
}
