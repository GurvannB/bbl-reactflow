import {NodeProps} from "reactflow";
import {BunnyData} from "@/lib/types";

export default function BunnyNode({data}: NodeProps<BunnyData>) {
    return <div className="border p-2 bg-red-500">{data.name}</div>
}