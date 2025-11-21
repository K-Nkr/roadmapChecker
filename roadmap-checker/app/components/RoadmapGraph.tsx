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
import dagre from 'dagre';
import { INITIAL_ROADMAP, RoadmapItem } from '../data/roadmap';
import ItemDetailModal from './ItemDetailModal';
import { useRoadmapProgress } from '../hooks/useRoadmapProgress';

const NODE_WIDTH = 180;
const NODE_HEIGHT = 80;

// Dagre-based automatic layout
const getLayoutedElements = (items: RoadmapItem[]) => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({
        rankdir: 'TB', // Top to Bottom
        nodesep: 100,
        ranksep: 150,
        edgesep: 50,
    });

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Add nodes to dagre graph
    items.forEach((item) => {
        dagreGraph.setNode(item.id, { width: NODE_WIDTH, height: NODE_HEIGHT });

        nodes.push({
            id: item.id,
            data: { label: item.title },
            position: { x: 0, y: 0 }, // Will be set by dagre
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

        // Add edges
        item.dependencies.forEach((depId) => {
            dagreGraph.setEdge(depId, item.id);
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

    // Calculate layout
    dagre.layout(dagreGraph);

    // Apply positions from dagre
    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.position = {
            x: nodeWithPosition.x - NODE_WIDTH / 2,
            y: nodeWithPosition.y - NODE_HEIGHT / 2,
        };
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

    // Note: Edge style updates are removed to prevent position shifting
    // Only nodes will be highlighted on hover

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
