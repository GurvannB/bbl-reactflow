'use client';
import {Background, ReactFlow} from "reactflow";
import '@xyflow/react/dist/style.css';

export default function Home() {
    return (
        <main className="w-full h-full">
            <ReactFlow
                nodes={[]}
                edges={[]}
            >
                <Background/>
            </ReactFlow>
        </main>
    );
}
