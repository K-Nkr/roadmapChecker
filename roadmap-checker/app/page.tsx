import RoadmapGraph from "./components/RoadmapGraph";
import DataManagement from "./components/DataManagement";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 dark:bg-gray-900 dark:text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center lg:text-left">Roadmap Checker</h1>
        <div className="flex items-center gap-4 mb-4 lg:mb-0">
          <DataManagement />
          <ThemeToggle />
        </div>
      </div>

      <div className="w-full h-[500px] md:h-[600px] border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
        <RoadmapGraph />
      </div>
    </main >
  );
}
