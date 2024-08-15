import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchProjects } from "@/lib/fetch/fetchProjects";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const ProjectPage = async () => {

  const data = await fetchProjects();

  console.log(data)

  return (
    <div className="mt-8 w-[60%] h-full flex flex-col items-center justify-center">
      <DataTable columns={columns} data={data}/>
    </div>
  );
}

export default ProjectPage;
