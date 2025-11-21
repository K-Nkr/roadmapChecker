import RoadmapGraph from "./components/RoadmapGraph";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center lg:text-left">Roadmap Checker</h1>
        <div className="flex gap-2 mb-4 lg:mb-0">
          <button
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localStorage.getItem('roadmap-checker-progress') ? JSON.parse(localStorage.getItem('roadmap-checker-progress')!) : {}));
              const downloadAnchorNode = document.createElement('a');
              downloadAnchorNode.setAttribute("href", dataStr);
              downloadAnchorNode.setAttribute("download", "roadmap-progress.json");
              document.body.appendChild(downloadAnchorNode);
              downloadAnchorNode.click();
              downloadAnchorNode.remove();
            }}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs md:text-sm"
          >
            エクスポート
          </button>
          <label className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer text-xs md:text-sm">
            インポート
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (event) => {
                  try {
                    const json = JSON.parse(event.target?.result as string);
                    localStorage.setItem('roadmap-checker-progress', JSON.stringify(json));
                    window.location.reload(); // Simple reload to reflect changes
                  } catch (error) {
                    alert('ファイルの読み込みに失敗しました。');
                  }
                };
                reader.readAsText(file);
              }}
            />
          </label>
        </div>
      </div>
      <div className="w-full h-[500px] md:h-[600px] border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
        <RoadmapGraph />
      </div>
    </main>
  );
}
