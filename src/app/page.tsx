'use client';
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    ReactFlow
} from "reactflow";
import '@xyflow/react/dist/style.css';
import {useCallback, useState} from "react";

const defaultNodes: Node[] = [
    {
        id: '1',
        data: {label: 'Input Node'},
        position: {x: 250, y: 250},
    },
    {
        id: '2',
        data: {label: 'Input Node'},
        position: {x: 250, y: 400},
    },
];

const defaultEdges: Edge[] = [];

export default function Home() {
    const [nodes, setNodes] = useState<Node[]>(defaultNodes);
    const [edges, setEdges] = useState<Edge[]>(defaultEdges);

    const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((prev) => applyNodeChanges(changes, prev)), []);
    const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((prev) => applyEdgeChanges(changes, prev)), []);
    const onConnect = useCallback((params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), []);

    return (
        <main className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                snapGrid={[10, 10]}
                snapToGrid={true}
                defaultEdgeOptions={{
                    type: "smoothstep",
                }}
            >
                <Background/>
            </ReactFlow>
        </main>
    );
}
