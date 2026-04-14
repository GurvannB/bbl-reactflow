'use client';
import {
    addEdge,
    Background,
    Edge,
    Node,
    NodeTypes,
    OnConnect,
    Panel,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
    useReactFlow
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import {useCallback, useState} from "react";
import AddBunnyDialog from "@/components/dialogs/add-bunny.dialog";
import {BunnyData, EdgeData} from "@/lib/types";
import BunnyNode from "@/components/bunny-node";
import {Button} from "@/components/ui/button";

const defaultDimensions = {
    width: 120,
    height: 50,
};

const initialNodes: Node<BunnyData>[] = [
    {
        id: '1',
        type: 'bunny',
        ...defaultDimensions,
        data: {name: 'Nougat', job: 'Cacaoculteur'},
        position: {x: 250, y: 200},
    },
    {
        id: '2',
        type: 'bunny',
        width: 150,
        height: defaultDimensions.height,
        data: {name: 'Pistache', job: 'Cacaoculteur'},
        position: {x: 220, y: 400},
    },
    {
        id: '3',
        type: 'bunny',
        ...defaultDimensions,
        data: {name: 'Sunny', job: 'Stockage'},
        position: {x: 550, y: 300},
    },
];

const initialEdges: Edge<EdgeData>[] = [
    {
        id: 'e1-3',
        source: '1',
        target: '3',
        label: '20 kg',
        data: {
            quantity: 20,
        }
    },
    {
        id: 'e2-3',
        source: '2',
        target: '3',
        label: '30 kg',
        data: {
            quantity: 30,
        }
    }
];

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
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [toAddBunny, setToAddBunny] = useState<Node<BunnyData> | null>(null);

    const {screenToFlowPosition, addNodes} = useReactFlow<Node<BunnyData>>();

    const handleAddBunny = useCallback((data: BunnyData) => {
        setToAddBunny({
            id: crypto.randomUUID(),
            type: 'bunny',
            ...defaultDimensions,
            position: {x: 0, y: 0},
            data,
        });
    }, []);

    const handlePaneClick = useCallback((event: React.MouseEvent) => {
        if (toAddBunny) {
            const position = screenToFlowPosition({x: event.clientX, y: event.clientY});
            addNodes({
                ...toAddBunny,
                position,
            });
            setToAddBunny(null);
        }
    }, [addNodes, screenToFlowPosition, toAddBunny]);

    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges],
    );

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
                onPaneClick={handlePaneClick}
                selectNodesOnDrag={false}
                fitView
                fitViewOptions={{
                    maxZoom: 1.5,
                }}
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
