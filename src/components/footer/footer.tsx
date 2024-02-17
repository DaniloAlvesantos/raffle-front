import LogoAgency from "@/assets/LOGO 2 - PNG.png";
import { IoLogoWhatsapp } from "react-icons/io";
import * as color from "tailwindcss/colors";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-zinc-950 h-auto w-full font-Montserrat p-4 relative mt-auto">
      <div className="w-full h-full">
        <img
          src={LogoAgency}
          className="w-[3rem] h-[3rem] md:w-[5.5rem] md:h-[3.7rem] object-contain absolute -top-[3rem] right-2 md:-top-[4rem] md:-right-0 rounded-tl-md"
        />
        <ul className="flex flex-col">
          <li className="flex flex-col items-center justify-center gap-4">
            <p className="text-sm">Participe de nosso grupo de WhatsApp</p>
            <a href="https://chat.whatsapp.com/LZDyozWW6sS85L9hzs2YNY" target="_blank">
              <IoLogoWhatsapp
                className="w-[3.6rem] h-[3.6em] hover:bg-zinc-700 transition-colors rounded p-2"
                color={color.green[500]}
              />
            </a>
          </li>
        </ul>
        <p className="font-medium text-center mt-4">
          &copy;Kalov-Prêmios - {year}
        </p>
      </div>
    </footer>
  );
}
