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
    NodeChange, NodeTypes,
    Panel,
    ReactFlow,
    ReactFlowProvider,
    useReactFlow
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import {useCallback, useState} from "react";
import AddBunnyDialog from "@/components/dialogs/add-bunny.dialog";
import {BunnyData} from "@/lib/types";
import BunnyNode from "@/components/bunny-node";
import {Button} from "@/components/ui/button";

const defaultDimensions = {
    width: 120,
    height: 50,
};

const defaultNodes: Node<BunnyData>[] = [
    {
        id: '1',
        type: 'bunny',
        ...defaultDimensions,
        data: {name: 'Babul'},
        position: {x: 250, y: 250},
    },
    {
        id: '2',
        type: 'bunny',
        ...defaultDimensions,
        data: {name: 'Gribouille'},
        position: {x: 250, y: 400},
    },
];

const defaultEdges: Edge[] = [];

const nodeTypes: NodeTypes = {
    'bunny': BunnyNode,
}

export default function Home() {
    return (
        <ReactFlowProvider>
            <Flow/>
        </ReactFlowProvider>
    );
}

function Flow() {
    const [nodes, setNodes] = useState<Node<BunnyData>[]>(defaultNodes);
    const [edges, setEdges] = useState<Edge[]>(defaultEdges);
    const [toAddBunny, setToAddBunny] = useState<Node<BunnyData> | null>(null);

    const {screenToFlowPosition, addNodes} = useReactFlow<Node<BunnyData>>();

    const onNodesChange = useCallback((changes: NodeChange<Node<BunnyData>>[]) => setNodes((prev) => applyNodeChanges(changes, prev)), []);
    const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((prev) => applyEdgeChanges(changes, prev)), []);
    const onConnect = useCallback((params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), []);

    const handleAddBunny = useCallback((data: BunnyData) => {
        setToAddBunny({
            id: crypto.randomUUID(),
            type: 'bunny',
            ...defaultDimensions,
            position: {x: 0, y: 0},
            data,
        });
    }, []);

    const handleClick = useCallback((event: React.MouseEvent) => {
        if (toAddBunny) {
            const position = screenToFlowPosition({x: event.clientX, y: event.clientY});
            addNodes({
                ...toAddBunny,
                position,
            });
            setToAddBunny(null);
        }
    }, [addNodes, screenToFlowPosition, toAddBunny]);

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
                onClick={handleClick}
            >
                <Background/>
                <Panel position="top-center">
                    <div className="grid gap-1">
                        <div className="flex gap-2">
                            {!!toAddBunny && <Button onClick={() => setToAddBunny(null)}>Annuler</Button>}
                            <AddBunnyDialog disabled={!!toAddBunny} onSubmit={handleAddBunny}/>
                        </div>
                        {toAddBunny && <p className="text-xs">Cliquez sur le canvas pour ajouter le nœud</p>}
                    </div>
                </Panel>
            </ReactFlow>
        </main>
    );
}
