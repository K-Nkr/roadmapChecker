'use client';

import React from 'react';
import { INITIAL_ROADMAP } from '../data/roadmap';
import { useRoadmapProgress } from '../hooks/useRoadmapProgress';
import { FileDown } from 'lucide-react';

export default function ExportSkillSheet() {
    const { progress } = useRoadmapProgress();

    const generateMarkdown = () => {
        let markdown = '# スキルシート - ロードマップ進捗\n\n';
        markdown += `作成日: ${new Date().toLocaleDateString('ja-JP')}\n\n`;

        // Get all items including children
        const allItems = [
            ...INITIAL_ROADMAP,
            ...INITIAL_ROADMAP.flatMap(item => item.children || [])
        ];

        // Filter completed items
        const completedItems = allItems.filter(item => {
            const itemProgress = progress[item.id];
            return itemProgress && itemProgress.status === 'completed';
        });

        if (completedItems.length === 0) {
            markdown += '> まだ完了した項目がありません。\n';
            return markdown;
        }

        markdown += `## 完了した技術スタック (${completedItems.length}件)\n\n`;

        // Group by category
        const categories = ['Basic', 'Language', 'Framework', 'Tooling', 'Backend', 'Database', 'Testing', 'DevOps'];

        categories.forEach(category => {
            const categoryItems = completedItems.filter(item => item.category === category);

            if (categoryItems.length > 0) {
                markdown += `### ${category}\n\n`;

                categoryItems.forEach(item => {
                    const itemProgress = progress[item.id];
                    markdown += `#### ${item.title}\n\n`;
                    markdown += `**説明**: ${item.description}\n\n`;

                    if (itemProgress.reason) {
                        markdown += `**技術選定の理由 / 学んだこと**:\n${itemProgress.reason}\n\n`;
                    }

                    if (itemProgress.repoUrl) {
                        markdown += `**成果物**: [${itemProgress.repoUrl}](${itemProgress.repoUrl})\n\n`;
                    }

                    markdown += '---\n\n';
                });
            }
        });

        return markdown;
    };

    const handleExport = () => {
        const markdown = generateMarkdown();
        const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `roadmap-skills-${new Date().toISOString().split('T')[0]}.md`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
            <FileDown size={20} />
            スキルシートをエクスポート
        </button>
    );
}
