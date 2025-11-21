import { useState, useEffect } from 'react';

export interface ItemProgress {
    status: 'not-started' | 'in-progress' | 'completed';
    reason?: string;
    repoUrl?: string;
}

export interface RoadmapProgress {
    [itemId: string]: ItemProgress;
}

const STORAGE_KEY = 'roadmap-checker-progress';

export function useRoadmapProgress() {
    const [progress, setProgress] = useState<RoadmapProgress>({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setProgress(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse roadmap progress', e);
            }
        }
        setIsLoaded(true);
    }, []);

    const updateProgress = (itemId: string, data: Partial<ItemProgress>) => {
        setProgress((prev) => {
            const newProgress = {
                ...prev,
                [itemId]: { ...prev[itemId], ...data },
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
            return newProgress;
        });
    };

    return { progress, updateProgress, setProgress, isLoaded };
}
