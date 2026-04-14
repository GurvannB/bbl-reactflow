import {NodeProps} from "reactflow";
import {BunnyData} from "@/lib/types";
import {Rabbit} from "lucide-react";

export default function BunnyNode({data}: NodeProps<BunnyData>) {
    return <div className="border p-2 rounded-lg bg-white flex gap-2">
        <Rabbit/> <p className="bold">{data.name}</p>
    </div>
}