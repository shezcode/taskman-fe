import Link from "next/link";
import { ModeToggle } from "./ui/mode-toggle";
import { Separator } from "./ui/separator";

const NavbarLogin = () => {
  return (
    <>
    <nav className="w-full flex flex-row items-center justify-around my-4">
      <div className="flex flex-row gap-8 items-center justtify-between h-8">
        <div>
          <Link href="/proyecto" className="text-[32px] font-extrabold hollow-text">taskMan.</Link>
        </div>
        <Separator orientation="vertical" className="h-12"/>
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

export default NavbarLogin;
