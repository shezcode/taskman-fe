"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { fetchDepartments, fetchDepByName } from "@/lib/fetch/fetchDepartments";
import { Departamento } from "@/lib/types";
import { Search, X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const DepartmentPage = () => {

  const [data, setData] = useState<Departamento[] | null>(null);
  const [searchParam, setSearchParam] = useState<string>("");

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
      let newdata = await fetchDepByName(searchParam);
      setData(newdata);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
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
    <div className="py-4 gap-4 flex flex-col items-center w-full ">
      <form 
        onSubmit={handleSearch}
        className="flex flex-row gap-0 mb-8"
        action="">
        <div className="relative w-full">
          {searchParam && (
            <Button variant={"ghost"} onClick={handleCancel} className="absolute top-0 left-0 w-12">
              <X className="w-full"/>
            </Button>
          )}
          <Input className="w-80 px-12" aria-label="Search" value={searchParam} onChange={handleChange} onKeyDown={handleEnter} />
          <Button type="submit" variant={"ghost"} className="absolute top-0 right-0">
            <Search />
          </Button>
        </div>
      </form>
      {data && (
        data.map(department => {
          return (
            <div key={department.Id_Departamento}>
              <h1>{department.Nombre} - {department.Id_Departamento}</h1>
              <h2>{department.Email}</h2>
              <h4>{department.Presupuesto}</h4>
              <Separator />
            </div>
          )
        })
      )}
    </div>
  );
}

export default DepartmentPage;
