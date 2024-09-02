"use client"

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { fetchDepartments, fetchDepBy } from "@/lib/fetch/fetchDepartments";
import { Departamento } from "@/lib/types";
import { Search, X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { getKeyByValue, parseCurrency } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const DepartmentPage = () => {

  const [data, setData] = useState<Departamento[] | null>(null);
  const [searchParam, setSearchParam] = useState<string>("");
  const [nombreClicked, setNombreClicked] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false);

  const getData = async () => {
    const res = await fetchDepartments();
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
      if (nombreClicked || (!nombreClicked && !emailClicked)){
        let newData = await fetchDepBy("name", searchParam);
        setData(newData);
      }

      if (emailClicked){
        let newData = await fetchDepBy("email", searchParam);
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
    <div className=" mt-8 gap-4 flex flex-col items-center w-[70%] border-[1.5px] border-slate rounded-xl p-4 min-h-[700px]">
      <h1 className="hollow-text text-[42px] self-start font-bold">DEPARTAMENTOS</h1>
      <Separator />
      <form 
        onSubmit={handleSearch}
        className="flex flex-col gap-4 self-start"
        action="">
        <Label htmlFor="search">Filtrar por:</Label>
        <div>
          <Button 
            onClick={() => {setNombreClicked((prev) => !prev); setEmailClicked(false)}}
            className={nombreClicked ? `rounded-r-none bg-green-400 hover:bg-green-400` : "rounded-r-none"}
          >Nombre</Button>

          <Button 
            onClick={() => {setEmailClicked((prev) => !prev); setNombreClicked(false)}}
            className={emailClicked ? `rounded-l-none bg-green-400 hover:bg-green-400` : "rounded-l-none"}
          >Email</Button>

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
      <div className="mt-8 w-[100%] h-full flex flex-col items-center justify-center">
        <Table className="border-slate border-[1.5px] rounded">
          <TableCaption className="mt-8">Lista de departamentos activos.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Fecha de alta</TableHead>
                <TableHead className="text-right">Presupuesto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.map((department) => (
                <TableRow key={department.Id_Departamento}>
                  <TableCell className="font-medium"><Link className="hover:underline" href={`/departamento/${department.Id_Departamento}`}>{department.Nombre}</Link></TableCell>
                  <TableCell>{department.Email}</TableCell>
                  <TableCell>{department.Fe_creacion}</TableCell>
                  <TableCell className="text-right">{parseCurrency(department.Presupuesto.toString())}</TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
      </div>

    </div>
  );
}

export default DepartmentPage;
