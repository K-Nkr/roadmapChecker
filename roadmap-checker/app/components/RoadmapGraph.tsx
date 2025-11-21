'use client';

import React, { useMemo, useEffect, useState, useCallback } from 'react';
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
const CATEGORY_SPACING = 300;
const LEVEL_SPACING = 150;
const WITHIN_CATEGORY_SPACING = 50;

// Category-based layout algorithm
const getLayoutedElements = (items: RoadmapItem[]) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const itemMap = new Map(items.map((item) => [item.id, item]));
    const levels = new Map<string, number>();

    // Calculate dependency levels
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

    // Group items by category and level
    const categoryGroups = new Map<string, Map<number, RoadmapItem[]>>();

    items.forEach((item) => {
        if (!categoryGroups.has(item.category)) {
            categoryGroups.set(item.category, new Map());
        }
        const levelMap = categoryGroups.get(item.category)!;
        const level = levels.get(item.id)!;
        if (!levelMap.has(level)) {
            levelMap.set(level, []);
        }
        levelMap.get(level)!.push(item);
    });

    // Calculate positions
    const categories = Array.from(categoryGroups.keys());
    let categoryX = 0;

    categories.forEach((category, categoryIndex) => {
        const levelMap = categoryGroups.get(category)!;
        const levelsInCategory = Array.from(levelMap.keys()).sort((a, b) => a - b);

        // Find max items in any level for this category to determine width
        const maxItemsInLevel = Math.max(...levelsInCategory.map(level => levelMap.get(level)!.length));
        const categoryWidth = maxItemsInLevel * (NODE_WIDTH + WITHIN_CATEGORY_SPACING);

        levelsInCategory.forEach((level) => {
            const itemsInLevel = levelMap.get(level)!;
            const startX = categoryX + (categoryWidth - itemsInLevel.length * (NODE_WIDTH + WITHIN_CATEGORY_SPACING)) / 2;

            itemsInLevel.forEach((item, index) => {
                nodes.push({
                    id: item.id,
                    data: {
                        label: item.title,
                        category: item.category,
                    },
                    position: {
                        x: startX + index * (NODE_WIDTH + WITHIN_CATEGORY_SPACING),
                        y: level * LEVEL_SPACING,
                    },
                    sourcePosition: Position.Bottom,
                    targetPosition: Position.Top,
                    style: {
                        width: NODE_WIDTH,
                        background: '#fff',
                        border: '1px solid #9ca3af',
                        borderRadius: '8px',
                        padding: '10px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '13px',
                    },
                });

                // Add edges
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
                            stroke: '#9ca3af',
                        },
                    });
                });
            });
        });

        categoryX += categoryWidth + CATEGORY_SPACING;
    });

    return { nodes, edges };
};

interface RoadmapGraphProps {
    items?: RoadmapItem[];
}

export default function RoadmapGraph({ items = INITIAL_ROADMAP }: RoadmapGraphProps) {
    const { nodes: initialNodes, edges: initialEdges } = useMemo(() => getLayoutedElements(items), [items]);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { progress, updateProgress, isLoaded } = useRoadmapProgress();

    const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

    // Reset nodes when items change
    useEffect(() => {
        setNodes(initialNodes);
        setEdges(initialEdges);
    }, [initialNodes, initialEdges, setNodes, setEdges]);

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

    // Handle node hover
    const onNodeMouseEnter = useCallback((_: React.MouseEvent, node: Node) => {
        setHoveredNodeId(node.id);
    }, []);

    const onNodeMouseLeave = useCallback(() => {
        setHoveredNodeId(null);
    }, []);

    // Get connected node IDs for highlighting
    const getConnectedNodes = useCallback((nodeId: string | null) => {
        if (!nodeId) return new Set<string>();

        const connected = new Set<string>([nodeId]);
        const item = items.find(i => i.id === nodeId);

        // Add dependencies (incoming)
        if (item) {
            item.dependencies.forEach(dep => connected.add(dep));
        }

        // Add dependents (outgoing)
        items.forEach(i => {
            if (i.dependencies.includes(nodeId)) {
                connected.add(i.id);
            }
        });

        return connected;
    }, [items]);

    // Update node styles based on progress and hover
    useEffect(() => {
        if (!isLoaded) return;

        const connectedNodes = getConnectedNodes(hoveredNodeId);

        setNodes((nds) =>
            nds.map((node) => {
                const itemProgress = progress[node.id];
                const status = itemProgress?.status || 'not-started';
                const isConnected = connectedNodes.has(node.id);
                const isHovered = node.id === hoveredNodeId;

                let style = { ...node.style };

                // Base style
                style.background = '#fff';
                style.border = '1px solid #9ca3af';

                // Override with progress status
                switch (status) {
                    case 'completed':
                        style.background = '#dcfce7'; // green-100
                        style.border = '2px solid #22c55e'; // green-500
                        break;
                    case 'in-progress':
                        style.background = '#dbeafe'; // blue-100
                        style.border = '2px solid #3b82f6'; // blue-500
                        break;
                }

                // Apply hover effects
                if (hoveredNodeId) {
                    if (isHovered) {
                        style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.5)';
                        style.opacity = '1';
                    } else if (isConnected) {
                        style.opacity = '1';
                        style.boxShadow = 'none';
                    } else {
                        style.opacity = '0.3';
                        style.boxShadow = 'none';
                    }
                } else {
                    // Reset hover effects when not hovering
                    style.opacity = '1';
                    style.boxShadow = 'none';
                }

                return {
                    ...node,
                    style,
                };
            })
        );
    }, [progress, isLoaded, hoveredNodeId, getConnectedNodes, setNodes]);

    return (
        <div style={{ width: '100%', height: '100%', minHeight: '500px' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                onNodeMouseEnter={onNodeMouseEnter}
                onNodeMouseLeave={onNodeMouseLeave}
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
