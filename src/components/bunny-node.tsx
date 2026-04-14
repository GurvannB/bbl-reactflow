import {NodeProps} from "reactflow";
import {BunnyData} from "@/lib/types";
import {Rabbit} from "lucide-react";
import {clsx} from "clsx";

export default function BunnyNode({data, selected}: NodeProps<BunnyData>) {
    return <div className={clsx("border p-2 rounded-lg bg-white flex gap-2", selected && "border-black")}>
        <Rabbit/> <p className="bold">{data.name}</p>
    </div>
}