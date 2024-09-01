import { fetchProjects } from "@/lib/fetch/fetchProjects";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ProjectPage = async () => {

  const data = await fetchProjects();

  return (
    <div className=" p-4 mt-12 border-[1.5px] border-slate rounded-md h-full flex flex-col items-center justify-center">
      <DataTable columns={columns} data={data}/>
      <Link className="self-start mt-8 p-2" href={"/proyecto/crear"}>
        <Button>Crear nuevo proyecto</Button>
      </Link>
    </div>
  );
}

export default ProjectPage;
