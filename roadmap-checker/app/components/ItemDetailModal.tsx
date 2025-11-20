import React, { useState, useEffect } from 'react';
import { RoadmapItem } from '../data/roadmap';
import { X } from 'lucide-react';
import { ItemProgress } from '../hooks/useRoadmapProgress';

interface ItemDetailModalProps {
    item: RoadmapItem | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: string, data: Partial<ItemProgress>) => void;
    initialData?: ItemProgress;
}

export default function ItemDetailModal({ item, isOpen, onClose, onSave, initialData }: ItemDetailModalProps) {
    const [status, setStatus] = useState<ItemProgress['status']>('not-started');
    const [reason, setReason] = useState('');
    const [repoUrl, setRepoUrl] = useState('');

    useEffect(() => {
        if (isOpen && initialData) {
            setStatus(initialData.status || 'not-started');
            setReason(initialData.reason || '');
            setRepoUrl(initialData.repoUrl || '');
        } else if (isOpen) {
            // Reset if no data
            setStatus('not-started');
            setReason('');
            setRepoUrl('');
        }
    }, [isOpen, initialData]);

    if (!isOpen || !item) return null;

    const handleSave = () => {
        onSave(item.id, {
            status,
            reason,
            repoUrl
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800 mr-2">
                        {item.category}
                    </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6">{item.description}</p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">ステータス</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as ItemProgress['status'])}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        >
                            <option value="not-started">未着手</option>
                            <option value="in-progress">学習中</option>
                            <option value="completed">完了</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">技術選定の理由</label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 h-24"
                            placeholder="なぜこの技術を選んだのですか？"
                        />
                    </div>

                    {item.requiredOutput && (
                        <div>
                            <label className="block text-sm font-medium mb-1">成果物 (リポジトリURL)</label>
                            <input
                                type="url"
                                value={repoUrl}
                                onChange={(e) => setRepoUrl(e.target.value)}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                placeholder="https://github.com/username/repo"
                            />
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        保存
                    </button>
                </div>
            </div>
        </div>
    );
}
