import Link from "next/link";
import { ModeToggle } from "./ui/mode-toggle";
import { Separator } from "./ui/separator";

const Navbar = () => {
  return (
    <>
    <nav className="w-full flex flex-row items-center justify-around my-4">
      <div className="flex flex-row gap-8 items-center justtify-between h-8">
        <div>
          <Link href="/" className="font-bold hollow-text">taskMan.</Link>
        </div>
        <Separator orientation="vertical" className="h-12"/>
        <Link href="/usuario">Usuarios</Link>
        <Link href="/departamento">Departamentos</Link>
        <Link href="/tarea">Tareas</Link>
        <Link href="/proyecto">Proyectos</Link>
      </div>
      <div className="flex flex-row gap-8 items-center">
        <Link href="/login">Login</Link>
        <ModeToggle></ModeToggle>
      </div>
    </nav>
    <Separator />
    </>
  );
}

export default Navbar;
