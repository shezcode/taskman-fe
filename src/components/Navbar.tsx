import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <Link href="/usuario">Usuarios</Link>
      <Link href="/departamento">Departamentos</Link>
    </nav>
  );
}

export default Navbar;
