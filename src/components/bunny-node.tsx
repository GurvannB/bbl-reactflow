import {Handle, Node, NodeProps, NodeResizer, NodeToolbar, Position} from "@xyflow/react";
import {BunnyData} from "@/lib/types";
import {Rabbit} from "lucide-react";

export default function BunnyNode({data, selected, width, height}: NodeProps<Node<BunnyData>>) {
    return <div className="w-full h-full border p-2 rounded-lg bg-white flex gap-2 items-center justify-center">
        <Rabbit/> <p className="bold truncate">{data.name}</p>
        <NodeResizer isVisible={selected}/>
        <NodeToolbar position={Position.Bottom}>
            <p className="text-xs">{width}x{height}</p>
        </NodeToolbar>
        <Handle type="source" position={Position.Left}/>
        <Handle type="target" position={Position.Right}/>
    </div>
}