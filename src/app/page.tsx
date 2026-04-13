'use client';
import {applyNodeChanges, Background, Node, NodeChange, ReactFlow} from "reactflow";
import '@xyflow/react/dist/style.css';
import {useCallback, useState} from "react";

const defaultNodes: Node[] = [
    {
        id: '1',
        data: {label: 'Input Node'},
        position: {x: 250, y: 0},
    }
];

export default function Home() {
    const [nodes, setNodes] = useState<Node[]>(defaultNodes);

    const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((prev) => applyNodeChanges(changes, prev)), []);

    return (
        <main className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={[]}
                onNodesChange={onNodesChange}
                snapToGrid={true}
                snapGrid={[10, 10]}
            >
                <Background/>
            </ReactFlow>
        </main>
    );
}
