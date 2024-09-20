import Link from "next/link";
import { ModeToggle } from "./ui/mode-toggle";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Logout } from "./Logout";
import { DeleteButton } from "./DeleteButton";

const Navbar = () => {
  return (
    <>
      <nav className="w-full flex flex-row items-center justify-around my-4">
        <div className="flex flex-row gap-8 items-center justtify-between h-8">
          <div>
            <Link href="/proyecto" className="font-extrabold hollow-text text-[32px]">taskMan.</Link>
          </div>
          <Separator orientation="vertical" className="h-12" />
          <Link href="/usuario" className="hover:underline">Usuarios</Link>
          <Separator className="w-4" />
          <Link href="/proyecto" className="hover:underline">Proyectos</Link>
          <Separator className="w-4" />
          <Link href="/tarea" className="hover:underline">Tareas</Link>
          <Separator className="w-4" />
          <Link href="/departamento" className="hover:underline">Departamentos</Link>
        </div>
        <div className="flex flex-row gap-8 items-center">
          <Logout />
          <ModeToggle></ModeToggle>
        </div>
      </nav>
      <Separator />
    </>
  );
}

export default Navbar;
