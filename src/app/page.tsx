import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center py-8">
      <header>
        <ModeToggle></ModeToggle>
      </header>
      <main className="flex flex-row py-12 w-1/2 border-black border-2">
        <div className="flex flex-col w-2/3">
          <h1>taskMan</h1>
          <h2>Your go-to task manager.</h2>
        </div>
        <div className="flex flex-col w-1/3">
          <p>Some cringy description</p>
        </div>
          
      </main>
    </div>
  );
}
