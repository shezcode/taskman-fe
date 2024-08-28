import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchUsuarios } from "@/lib/fetch/fetchUsuarios";
import { DEPARTAMENTOS, getKeyByValue } from "@/lib/utils";
import Link from "next/link";

const UserPage = async () => {

  const data = await fetchUsuarios();

  return (
    <div className="mt-8 w-[60%] h-full flex flex-col items-center justify-center">
      <Table className="border-slate border-[1.5px] rounded">
        <TableCaption className="mt-8">Lista de usuarios activos.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Fecha de alta</TableHead>
              <TableHead className="text-right">Departamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((usuario) => (
              <TableRow key={usuario.Id_Usuario}>
                <TableCell className="font-medium"><Link className="hover:underline" href={`/usuario/${usuario.Id_Usuario}`}>{usuario.Nombre}</Link></TableCell>
                <TableCell>{usuario.Email}</TableCell>
                <TableCell>{usuario.Fe_alta}</TableCell>
                <TableCell className="text-right">{getKeyByValue(usuario.Id_Departamento)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
    </div>
  );
}


export default UserPage;

