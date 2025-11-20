import RoadmapGraph from "./components/RoadmapGraph";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">Roadmap Checker</h1>
      </div>
      <div className="w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden">
        <RoadmapGraph />
      </div>
    </main>
  );
}
