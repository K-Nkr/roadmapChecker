'use client';

import { useParams, useRouter } from 'next/navigation';
import { INITIAL_ROADMAP } from '../../data/roadmap';
import { useRoadmapProgress } from '../../hooks/useRoadmapProgress';
import { ArrowLeft, ExternalLink, CheckCircle, Circle, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import RoadmapGraph from '../../components/RoadmapGraph';

export default function ItemDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { progress, updateProgress } = useRoadmapProgress();
    const id = params.id as string;

    const item = INITIAL_ROADMAP.find((i) => i.id === id) ||
        INITIAL_ROADMAP.flatMap(i => i.children || []).find(i => i.id === id);

    const [status, setStatus] = useState<'not-started' | 'in-progress' | 'completed'>('not-started');
    const [reason, setReason] = useState('');
    const [repoUrl, setRepoUrl] = useState('');
    const [errors, setErrors] = useState<{ reason?: string; repoUrl?: string }>({});

    useEffect(() => {
        if (progress[id]) {
            setStatus(progress[id].status);
            setReason(progress[id].reason || '');
            setRepoUrl(progress[id].repoUrl || '');
        }
    }, [progress, id]);

    if (!item) {
        return <div className="p-8 text-center">Item not found</div>;
    }

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
        if (validate()) {
            updateProgress(id, { status, reason, repoUrl });
            alert('保存しました');
        }
    };

    return (
        <main className="min-h-screen p-4 md:p-8 dark:bg-gray-900 dark:text-white">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <ArrowLeft size={20} />
                    戻る
                </button>

                <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{item.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Status & Input Section */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <h2 className="text-xl font-semibold mb-4">学習ステータス</h2>

                        <div className="flex gap-2 mb-6">
                            <button
                                onClick={() => setStatus('not-started')}
                                className={`flex-1 py-2 px-4 rounded border ${status === 'not-started'
                                        ? 'bg-gray-100 border-gray-400 text-gray-900 dark:bg-gray-700 dark:text-white'
                                        : 'border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <Circle size={16} /> 未着手
                                </div>
                            </button>
                            <button
                                onClick={() => setStatus('in-progress')}
                                className={`flex-1 py-2 px-4 rounded border ${status === 'in-progress'
                                        ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                        : 'border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <Clock size={16} /> 学習中
                                </div>
                            </button>
                            <button
                                onClick={() => setStatus('completed')}
                                className={`flex-1 py-2 px-4 rounded border ${status === 'completed'
                                        ? 'bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                        : 'border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <CheckCircle size={16} /> 完了
                                </div>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    技術選定の理由 / 学んだこと
                                    {status === 'completed' && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                <textarea
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.reason ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    rows={3}
                                    placeholder="なぜこの技術を選んだのか、何を学んだのかを記録しましょう。"
                                />
                                {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    成果物URL (GitHubなど)
                                </label>
                                <input
                                    type="text"
                                    value={repoUrl}
                                    onChange={(e) => setRepoUrl(e.target.value)}
                                    className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 ${errors.repoUrl ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="https://github.com/username/repo"
                                />
                                {errors.repoUrl && <p className="text-red-500 text-sm mt-1">{errors.repoUrl}</p>}
                            </div>

                            <button
                                onClick={handleSave}
                                className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
                            >
                                保存する
                            </button>
                        </div>
                    </div>

                    {/* Tutorials Section */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <h2 className="text-xl font-semibold mb-4">おすすめ学習リソース</h2>
                        {item.tutorials && item.tutorials.length > 0 ? (
                            <ul className="space-y-3">
                                {item.tutorials.map((tutorial, index) => (
                                    <li key={index}>
                                        <a
                                            href={tutorial.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400"
                                        >
                                            <ExternalLink size={16} />
                                            {tutorial.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">
                                現在登録されているチュートリアルはありません。
                            </p>
                        )}
                    </div>
                </div>

                {/* Sub-Roadmap Section */}
                {item.children && item.children.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-6">詳細ロードマップ</h2>
                        <div className="w-full h-[500px] border border-gray-300 rounded-lg overflow-hidden bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
                            <RoadmapGraph items={item.children} />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
