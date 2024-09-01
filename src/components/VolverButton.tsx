"use client"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";


const VolverButton = () => {
  const router = useRouter();

  const handleRefresh = () => {
    router.back();
  }

  return (
    <Button variant={"outline"} className="" onClick={handleRefresh}>Volver</Button>
  );
}

export default VolverButton;
