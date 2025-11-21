'use client';

import { X } from 'lucide-react';
import { INITIAL_ROADMAP, RoadmapItem } from '../data/roadmap';
import { RoadmapProgress } from '../hooks/useRoadmapProgress';

interface DashboardModalProps {
    isOpen: boolean;
    onClose: () => void;
    progress: RoadmapProgress;
}

export default function DashboardModal({ isOpen, onClose, progress }: DashboardModalProps) {
    if (!isOpen) return null;

    // Calculate Overall Progress
    const totalItems = INITIAL_ROADMAP.length;
    const completedItems = INITIAL_ROADMAP.filter(
        (item) => progress[item.id]?.status === 'completed'
    ).length;
    const overallPercentage = Math.round((completedItems / totalItems) * 100) || 0;

    // Calculate Category Progress
    const categories = Array.from(new Set(INITIAL_ROADMAP.map((item) => item.category)));
    const categoryProgress = categories.map((category) => {
        const itemsByCategory = INITIAL_ROADMAP.filter((item) => item.category === category);
        const completedByCategory = itemsByCategory.filter(
            (item) => progress[item.id]?.status === 'completed'
        ).length;
        const percentage = Math.round((completedByCategory / itemsByCategory.length) * 100) || 0;
        return { category, percentage, completed: completedByCategory, total: itemsByCategory.length };
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800 animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <X size={24} />
                </button>

                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">学習ダッシュボード</h2>

                {/* Overall Progress */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">総合進捗</span>
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{overallPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                        <div
                            className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${overallPercentage}%` }}
                        ></div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-right">
                        {completedItems} / {totalItems} 項目完了
                    </p>
                </div>

                {/* Category Progress */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categoryProgress.map((cat) => (
                        <div key={cat.category} className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700/50">
                            <div className="flex justify-between mb-2">
                                <span className="font-medium text-gray-700 dark:text-gray-200">{cat.category}</span>
                                <span className="font-bold text-gray-900 dark:text-white">{cat.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                                <div
                                    className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${cat.percentage}%` }}
                                ></div>
                            </div>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
                                {cat.completed} / {cat.total}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
