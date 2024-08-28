import Link from "next/link";
import { ModeToggle } from "./ui/mode-toggle";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <>
    <nav className="w-full flex flex-row items-center justify-around my-4">
      <div className="flex flex-row gap-8 items-center justtify-between h-8">
        <div>
          <Link href="/proyecto" className="font-extrabold hollow-text text-[32px]">taskMan.</Link>
        </div>
        <Separator orientation="vertical" className="h-12"/>
        <Button variant={"link"}>
          <Link href="/usuario">Usuarios</Link>
        </Button>
        <Separator className="w-4"/>
        <Button variant={"link"}>
          <Link href="/proyecto">Proyectos</Link>
        </Button>
        <Separator className="w-4"/>
        <Button variant={"link"}>
          <Link href="/tarea">Tareas</Link>
        </Button>
        <Separator className="w-4"/>
        <Button variant={"link"}>
          <Link href="/departamento">Departamentos</Link>
        </Button>

      </div>
      <div className="flex flex-row gap-8 items-center">
        <Button variant={"link"}>
          <Link href="/login">Login</Link>
        </Button>
        <ModeToggle></ModeToggle>
      </div>
    </nav>
    <Separator />
    </>
  );
}

export default Navbar;
