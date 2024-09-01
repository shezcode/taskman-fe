"use client"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";


const CancelButton = () => {
  const router = useRouter();

  const handleRefresh = () => {
    router.back();
  }

  return (
    <Button className="bg-red-900 hover:bg-red-700 text-white" onClick={handleRefresh}>Cancelar</Button>
  );
}

export default CancelButton;
