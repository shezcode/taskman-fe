import { fetchProjects } from "@/lib/fetch/fetchProjects";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const ProjectPage = async () => {

  const data = await fetchProjects();

  return (
    <div className=" p-4 mt-12 w-[60%] h-full flex flex-col items-center justify-center">
      <DataTable columns={columns} data={data}/>
    </div>
  );
}

export default ProjectPage;
