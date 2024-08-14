"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { fetchDepartments, fetchDepByName } from "@/lib/fetch/fetchDepartments";
import { Departamento } from "@/lib/types";
import { Search } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

const DepartmentPage = () => {

  const [data, setData] = useState<Departamento[] | null>(null);
  const [searchParam, setSearchParam] = useState<string>("");

  const getData = async () => {
    const res = await fetchDepartments();
    setData(res);
  }

  if (searchParam === ""){
    getData();
  }

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newdata = await fetchDepByName(searchParam);
    setData(newdata);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
  }

  return (
    <div className="py-4 gap-4 flex flex-col items-center w-full ">
      <form 
        onSubmit={handleSearch}
        className="flex flex-row gap-0"
        action="">
        <Input className="w-40" aria-label="Search" value={searchParam} onChange={handleChange}/>
        <Button type="submit">
          <Search />
        </Button>
      </form>
      <Separator />
      {data && (
        data.map(department => {
          return (
            <div key={department.id_Departamento}>
              <h1>{department.nombre} - {department.id_Departamento}</h1>
              <h2>{department.email}</h2>
              <h4>{department.presupuesto}</h4>
              <Separator />
            </div>
          )
        })
      )}
    </div>
  );
}

export default DepartmentPage;
