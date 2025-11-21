'use client';

import React, { useMemo, useEffect } from 'react';
import ReactFlow, {
    Background,
    Controls,
    Edge,
    Node,
    useNodesState,
    useEdgesState,
    Position,
    MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { INITIAL_ROADMAP, RoadmapItem } from '../data/roadmap';
import ItemDetailModal from './ItemDetailModal';
import { useRoadmapProgress } from '../hooks/useRoadmapProgress';

const NODE_WIDTH = 180;
const NODE_HEIGHT = 80;
const X_SPACING = 250;
const Y_SPACING = 150;

// Simple layout algorithm based on dependency depth
const getLayoutedElements = (items: RoadmapItem[]) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const itemMap = new Map(items.map((item) => [item.id, item]));
    const levels = new Map<string, number>();

    const getLevel = (id: string): number => {
        if (levels.has(id)) return levels.get(id)!;
        const item = itemMap.get(id);
        if (!item || item.dependencies.length === 0) {
            levels.set(id, 0);
            return 0;
        }
        const parentLevels = item.dependencies.map(getLevel);
        const level = Math.max(...parentLevels) + 1;
        levels.set(id, level);
        return level;
    };

    items.forEach((item) => getLevel(item.id));

    const levelCounts = new Map<number, number>();

    items.forEach((item) => {
        const level = levels.get(item.id)!;
        const count = levelCounts.get(level) || 0;
        levelCounts.set(level, count + 1);

        nodes.push({
            id: item.id,
            data: { label: item.title },
            position: {
                x: count * X_SPACING,
                y: level * Y_SPACING,
            },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
            style: {
                width: NODE_WIDTH,
                background: '#fff',
                border: '1px solid #777',
                borderRadius: '8px',
                padding: '10px',
                textAlign: 'center',
                fontWeight: 'bold',
            },
        });

        item.dependencies.forEach((depId) => {
            edges.push({
                id: `${depId}-${item.id}`,
                source: depId,
                target: item.id,
                type: 'smoothstep',
                animated: false,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 20,
                    height: 20,
                },
                style: {
                    strokeDasharray: '5 5',
                    strokeWidth: 2,
                },
            });
        });
    });

    return { nodes, edges };
};

interface RoadmapGraphProps {
    items?: RoadmapItem[];
}

export default function RoadmapGraph({ items = INITIAL_ROADMAP }: RoadmapGraphProps) {
    const { nodes: initialNodes, edges: initialEdges } = useMemo(() => getLayoutedElements(items), [items]);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);
    const { progress, updateProgress, isLoaded } = useRoadmapProgress();

    const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // Reset nodes when items change
    useEffect(() => {
        setNodes(initialNodes);
    }, [initialNodes, setNodes]);

    const onNodeClick = (_: React.MouseEvent, node: Node) => {
        setSelectedNodeId(node.id);
        setIsModalOpen(true);
    };

    const handleSave = (id: string, data: any) => {
        updateProgress(id, data);
        setIsModalOpen(false);
    };

    const selectedItem = useMemo(() =>
        items.find(item => item.id === selectedNodeId) || null
        , [selectedNodeId, items]);

    // Update node styles based on progress
    useEffect(() => {
        if (!isLoaded) return;

        setNodes((nds) =>
            nds.map((node) => {
                const itemProgress = progress[node.id];
                const status = itemProgress?.status || 'not-started';

                let style = { ...node.style };

                switch (status) {
                    case 'completed':
                        style.background = '#dcfce7'; // green-100
                        style.border = '2px solid #22c55e'; // green-500
                        break;
                    case 'in-progress':
                        style.background = '#dbeafe'; // blue-100
                        style.border = '2px solid #3b82f6'; // blue-500
                        break;
                    default:
                        style.background = '#fff';
                        style.border = '1px solid #9ca3af'; // gray-400
                        break;
                }

                return {
                    ...node,
                    style,
                };
            })
        );
    }, [progress, isLoaded, setNodes]);

    return (
        <div style={{ width: '100%', height: '100%', minHeight: '500px' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
            <ItemDetailModal
                item={selectedItem}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={selectedNodeId ? progress[selectedNodeId] : undefined}
            />
        </div>
    );
}
