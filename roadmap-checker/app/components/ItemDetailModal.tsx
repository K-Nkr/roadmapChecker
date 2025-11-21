import React, { useState, useEffect } from 'react';
import { RoadmapItem } from '../data/roadmap';
import { X, ExternalLink } from 'lucide-react';
import { ItemProgress } from '../hooks/useRoadmapProgress';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

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
    const [errors, setErrors] = useState<{ reason?: string; repoUrl?: string }>({});

    useEffect(() => {
        if (isOpen && initialData) {
            setStatus(initialData.status || 'not-started');
            setReason(initialData.reason || '');
            setRepoUrl(initialData.repoUrl || '');
            setErrors({});
        } else if (isOpen) {
            // Reset if no data
            setStatus('not-started');
            setReason('');
            setRepoUrl('');
            setErrors({});
        }
    }, [isOpen, initialData]);

    const validate = () => {
        const newErrors: { reason?: string; repoUrl?: string } = {};
        let isValid = true;

        if (status === 'completed' && !reason.trim()) {
            newErrors.reason = '完了にするには技術選定の理由を入力してください。';
            isValid = false;
        }

        if (repoUrl && !/^https?:\/\//.test(repoUrl)) {
            newErrors.repoUrl = 'URLは http:// または https:// で始めてください。';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = () => {
        if (!item) return;
        if (validate()) {
            onSave(item.id, {
                status,
                reason,
                repoUrl
            });
        }
    };

    return (
        <AnimatePresence>
            {isOpen && item && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md relative"
                        onClick={(e) => e.stopPropagation()}
                    >
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
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>

                        <div className="mb-6">
                            <Link
                                href={`/items/${item.id}`}
                                className="inline-flex items-center text-blue-600 hover:underline dark:text-blue-400"
                            >
                                詳細・チュートリアルを見る <ExternalLink size={16} className="ml-1" />
                            </Link>
                        </div>

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
                                <label className="block text-sm font-medium mb-1">技術選定の理由 <span className="text-red-500 text-xs">{status === 'completed' ? '(必須)' : ''}</span></label>
                                <textarea
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 h-24 ${errors.reason ? 'border-red-500' : ''}`}
                                    placeholder="なぜこの技術を選んだのですか？"
                                />
                                {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
                            </div>

                            {item.requiredOutput && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">成果物 (リポジトリURL)</label>
                                    <input
                                        type="url"
                                        value={repoUrl}
                                        onChange={(e) => setRepoUrl(e.target.value)}
                                        className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.repoUrl ? 'border-red-500' : ''}`}
                                        placeholder="https://github.com/username/repo"
                                    />
                                    {errors.repoUrl && <p className="text-red-500 text-xs mt-1">{errors.repoUrl}</p>}
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
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
