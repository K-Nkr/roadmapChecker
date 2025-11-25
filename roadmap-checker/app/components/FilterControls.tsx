'use client';

import { Search, X } from 'lucide-react';
import { RoadmapItem } from '../data/roadmap';

interface FilterControlsProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedCategories: string[];
    onCategoryChange: (categories: string[]) => void;
    selectedStatuses: string[];
    onStatusChange: (statuses: string[]) => void;
    onClearFilters: () => void;
}

const CATEGORIES = ['Basic', 'Language', 'Framework', 'Tooling', 'Backend', 'Database', 'Testing', 'DevOps'];
const STATUSES = [
    { value: 'not-started', label: '未着手' },
    { value: 'in-progress', label: '学習中' },
    { value: 'completed', label: '完了' },
];

export default function FilterControls({
    searchQuery,
    onSearchChange,
    selectedCategories,
    onCategoryChange,
    selectedStatuses,
    onStatusChange,
    onClearFilters,
}: FilterControlsProps) {
    const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedStatuses.length > 0;

    const toggleCategory = (category: string) => {
        if (selectedCategories.includes(category)) {
            onCategoryChange(selectedCategories.filter(c => c !== category));
        } else {
            onCategoryChange([...selectedCategories, category]);
        }
    };

    const toggleStatus = (status: string) => {
        if (selectedStatuses.includes(status)) {
            onStatusChange(selectedStatuses.filter(s => s !== status));
        } else {
            onStatusChange([...selectedStatuses, status]);
        }
    };

    return (
        <div className="mb-6 space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="項目名や説明で検索..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
            </div>

            {/* Category Filter */}
            <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">カテゴリ</label>
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => toggleCategory(category)}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedCategories.includes(category)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Status Filter */}
            <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">ステータス</label>
                <div className="flex flex-wrap gap-2">
                    {STATUSES.map((status) => (
                        <button
                            key={status.value}
                            onClick={() => toggleStatus(status.value)}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedStatuses.includes(status.value)
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                }`}
                        >
                            {status.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
                <button
                    onClick={onClearFilters}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                    <X size={16} />
                    フィルターをクリア
                </button>
            )}
        </div>
    );
}
