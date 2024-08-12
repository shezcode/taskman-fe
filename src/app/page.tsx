import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <div>
      <h1>TASKMAN INIT</h1>
      <ModeToggle></ModeToggle>
      <Button>Click me</Button>
    </div>
  );
}
