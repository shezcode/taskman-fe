"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/components/useAuth";
import { fetchMultipleUsersBy, fetchUsuarios } from "@/lib/fetch/fetchUsuarios";
import { Usuario } from "@/lib/types";
import { DEPARTAMENTOS, getKeyByValue, parseDateString } from "@/lib/utils";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const UserPage = () => {

  const [data, setData] = useState<Usuario[] | null>(null);
  const [searchParam, setSearchParam] = useState<string>("");
  const [nombreClicked, setNombreClicked] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false);
  const [depClicked, setDepClicked] = useState(false);

  const getData = async () => {
    const res = await fetchUsuarios();
    setData(res);
  }

  useEffect(() => {
    getData();
  }, [])

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchParam === ""){
      getData();
    } else {
      if (nombreClicked || (!nombreClicked && !emailClicked && !depClicked)){
        let newData = await fetchMultipleUsersBy("name", searchParam);
        setData(newData);
      }

      if (emailClicked){
        let newData = await fetchMultipleUsersBy("email", searchParam);
        setData(newData);
      }

      if (depClicked){
        let newData = await fetchMultipleUsersBy("depName", searchParam);
        setData(newData);
      }
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
    if(searchParam === ""){
      getData();
    }
  }

  const handleCancel = () => {
    setSearchParam("");
    getData();
  }

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e as unknown as FormEvent<HTMLFormElement>);
    }
  };


  return (
    <div className="mt-8 w-[60%] h-full flex flex-col items-start justify-center border-[1.5px] border-slate p-6 rounded-xl min-h-[700px]">
      <h1 className="hollow-text text-[42px] self-start font-bold">USUARIOS</h1>
      <Separator className="mb-8"/>
      <form 
        onSubmit={handleSearch}
        className="flex flex-col gap-4 self-start mb-8"
        action="">
        <Label htmlFor="search">Filtrar por:</Label>
        <div>
          <Button 
            onClick={() => {setNombreClicked((prev) => !prev); setEmailClicked(false); setDepClicked(false)}}
            className={nombreClicked ? `rounded-r-none bg-green-400 hover:bg-green-400` : "rounded-r-none"}
          >Nombre</Button>

          <Button 
            onClick={() => {setEmailClicked((prev) => !prev); setNombreClicked(false); setDepClicked(false)}}
            className={emailClicked ? `rounded-none bg-green-400 hover:bg-green-400` : "rounded-none"}
          >Email</Button>

          <Button 
            onClick={() => {setDepClicked((prev) => !prev); setEmailClicked(false); setNombreClicked(false)}}
            className={depClicked ? `rounded-l-none bg-green-400 hover:bg-green-400` : "rounded-l-none"}
          >Departamento</Button>
        </div>
        <div className="w-full relative">
          {searchParam && (
            <Button variant={"ghost"} onClick={handleCancel} className="absolute top-0 left-0 w-12">
              <X className="w-full"/>
            </Button>
          )}
          <div className="flex items-center">
            <Input className="w-80 px-12" placeholder="Buscar..." name="search" aria-label="Search" value={searchParam} onChange={handleChange} onKeyDown={handleEnter} />
            <Button type="submit" variant={"ghost"} className="absolute top-0 right-0">
              <Search />
            </Button>
          </div>
        </div>
      </form>

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
            {data && data.map((usuario) => (
              <TableRow key={usuario.Id_Usuario}>
                <TableCell className="font-medium"><Link className="hover:underline" href={`/usuario/${usuario.Id_Usuario}`}>{usuario.Nombre}</Link></TableCell>
                <TableCell>{usuario.Email}</TableCell>
                <TableCell>{parseDateString(usuario.Fe_alta)}</TableCell>
                <TableCell className="text-right">{getKeyByValue(usuario.Id_Departamento)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
    </div>
  );
}


export default UserPage;

