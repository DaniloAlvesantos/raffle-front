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
import { Notification } from "../notification/notification";
import { MdLogin } from "react-icons/md";

interface InfoProps {
  cpf: string;
  phone: string;
  name: string;
  email:string;
}

const initialStateInfo: InfoProps = {
  cpf: "",
  phone: "",
  name: "",
  email:""
};

export function Form() {
  const { Login, userErr, CreateUser, setUser, user } = useAuth();
  const { toast } = useToast();
  const [info, setInfo] = useState<InfoProps>({ ...initialStateInfo });

  function handleSubmitCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (info.cpf.length > 11 || info.cpf.length < 11) {
      return toast({
        title: "CPF invalido.",
        description: "Revise o CPF.",
      });
    }

    if (!info.phone) {
      return toast({
        title: "Telefone invalido",
        description: "Revise o Telefone",
      });
    }
    CreateUser(info);
  }

  useEffect(() => {
    console.log(info);
  });

  return (
    <div
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
                Já é um participante ? Faça login com seu CPF.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <span>
                <Label>CPF</Label>
                <Input
                  onChange={(e) => setUser({ ...user, cpf: e.target.value })}
                  className="w-[14rem] font-Montserrat font-medium"
                  placeholder="Digite seu CPF..."
                />
              </span>
            </CardContent>
            <CardFooter>
              <Button
                tabIndex={0}
                onClick={Login}
                type="button"
                className="gap-2"
                disabled={user.cpf.length < 11}
              >
                Fazer login
                <MdLogin color="#121212" width={24} height={24} />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <form
            onSubmit={handleSubmitCreate}
            className="font-Montserrat p-4 flex flex-col items-center"
          >
            <Card>
              <CardHeader>
                <CardTitle>Cadastrar</CardTitle>
                <CardDescription>
                  Cadastre-se como um usuario em nossa plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <span>
                  <Label>Nome Completo</Label>
                  <Input
                    onChange={(e) => setInfo({ ...info, name: e.target.value })}
                    className="w-[14rem] font-Montserrat font-medium"
                    placeholder="Digite seu número..."
                  />
                </span>
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
                    onChange={(e) =>
                      setInfo({ ...info, phone: e.target.value })
                    }
                    className="w-[14rem] font-Montserrat font-medium"
                    placeholder="Digite seu número..."
                  />
                </span>
                <span>
                  <Label>Email</Label>
                  <Input
                    onChange={(e) =>
                      setInfo({ ...info, email: e.target.value })
                    }
                    type="email"
                    className="w-[14rem] font-Montserrat font-medium"
                    placeholder="Digite seu número..."
                  />
                </span>
              </CardContent>
              <CardFooter>
                <Button
                  tabIndex={0}
                  disabled={info.phone.length <= 6}
                  type="submit"
                  className="gap-2"
                >
                  Criar conta
                  <MdLogin color="#121212" width={24} height={24} />
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>

      {userErr ? (
        <Notification
          title="Login"
          description="Erro ao cadastrar/login."
          variant="destructive"
          duration={10000}
        />
      ) : (
        <Toaster />
      )}
    </div>
  );
}
