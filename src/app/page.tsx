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
    NodeTypes,
    ReactFlow
} from "reactflow";
import '@xyflow/react/dist/style.css';
import {useCallback, useState} from "react";
import {BunnyData} from "@/lib/types";
import BunnyNode from "@/components/bunny-node";

const defaultNodes: Node<BunnyData>[] = [
    {
        id: '1',
        type: 'bunny',
        data: {name: 'Babul'},
        position: {x: 250, y: 250},
    },
    {
        id: '2',
        type: 'bunny',
        data: {name: 'Gribouille'},
        position: {x: 250, y: 400},
    },
];

const defaultEdges: Edge[] = [];

const nodeTypes: NodeTypes = {
    bunny: BunnyNode,
}

export default function Home() {
    const [nodes, setNodes] = useState<Node<BunnyData>[]>(defaultNodes);
    const [edges, setEdges] = useState<Edge[]>(defaultEdges);

    const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((prev) => applyNodeChanges(changes, prev)), []);
    const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((prev) => applyEdgeChanges(changes, prev)), []);
    const onConnect = useCallback((params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), []);

    return (
        <main className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                nodeTypes={nodeTypes}
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
