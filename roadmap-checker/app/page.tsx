'use client';

import { useState, useMemo } from 'react';
import RoadmapGraph from "./components/RoadmapGraph";
import DataManagement from "./components/DataManagement";
import ThemeToggle from "./components/ThemeToggle";
import DashboardModal from "./components/DashboardModal";
import FilterControls from "./components/FilterControls";
import { useRoadmapProgress } from "./hooks/useRoadmapProgress";
import { INITIAL_ROADMAP } from "./data/roadmap";
import { BarChart3 } from 'lucide-react';

export default function Home() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const { progress } = useRoadmapProgress();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  // Filter roadmap items
  const filteredItems = useMemo(() => {
    let items = INITIAL_ROADMAP;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.children && item.children.some(child =>
          child.title.toLowerCase().includes(query) ||
          child.description.toLowerCase().includes(query)
        ))
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      items = items.filter(item => selectedCategories.includes(item.category));
    }

    // Apply status filter
    if (selectedStatuses.length > 0) {
      items = items.filter(item => {
        const itemStatus = progress[item.id]?.status || 'not-started';
        return selectedStatuses.includes(itemStatus);
      });
    }

    return items;
  }, [searchQuery, selectedCategories, selectedStatuses, progress]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedStatuses([]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 dark:bg-gray-900 dark:text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center lg:text-left">Roadmap Checker</h1>
        <div className="flex items-center gap-4 mb-4 lg:mb-0">
          <button
            onClick={() => setIsDashboardOpen(true)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
            aria-label="Open Dashboard"
          >
            <BarChart3 size={20} />
          </button>
          <DataManagement />
          <ThemeToggle />
        </div>
      </div>

      <FilterControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
        selectedStatuses={selectedStatuses}
        onStatusChange={setSelectedStatuses}
        onClearFilters={clearFilters}
      />

      <div className="w-full h-[500px] md:h-[600px] border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
        <RoadmapGraph items={filteredItems} />
      </div>

      <DashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        progress={progress}
      />
    </main >
  );
}
