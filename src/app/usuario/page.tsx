import { Separator } from "@/components/ui/separator";
import { fetchUsuarios } from "@/lib/fetch/fetchUsuarios";

const UserPage = async () => {

  const data = await fetchUsuarios();

  const dataElements = data.map(usuario => {
    return (
      <div key={usuario.id_Usuario}>
        <h1>{usuario.nombre} - {usuario.id_Usuario}</h1>
        <h2>{usuario.email}</h2>
        <h4>{usuario.departamento.nombre}</h4>
        <Separator />
      </div>
    );
  })

  return (
    <div>
      {dataElements}
    </div>
  );
}

export default UserPage;
