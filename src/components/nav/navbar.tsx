import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { FiUser } from "react-icons/fi";
import { CiMenuFries } from "react-icons/ci";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/KALOVE PREMIOS BRANCO FOSCO .png"

export const NavBar: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate() 
  return (
    <nav className="bg-zinc-950 w-full flex flex-row justify-between py-2 px-4 font-Montserrat overflow-hidden">
      <img src={Logo} className="w-[30rem] -ml-20 -mt-4 h-20 object-cover" />

      <span className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <CiMenuFries
              color="white"
              width={32}
              height={32}
              className="md:hidden"
            />
          </SheetTrigger>
          <SheetContent side={"right"}>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Paginas</SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <ul className="flex flex-col items-center justify-center pt-16">
                <li onClick={() => navigate("/")}>
                  <Button variant="link">Home</Button>
                </li>
              </ul>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <Button className="hidden md:block" onClick={() => navigate("/")}>Home</Button>
        <Avatar className="cursor-pointer" onClick={() => navigate("/user")}>
          <AvatarImage src={user.avatarUrl} alt="user picture" />
          <AvatarFallback>
            <FiUser color="white" size={30} />
          </AvatarFallback>
        </Avatar>
      </span>
    </nav>
  );
};
