import {BaseEdge, Edge, EdgeProps, getSmoothStepPath} from "@xyflow/react";
import {EdgeData} from "@/lib/types";

export default function AnimatedEdge({
                                         sourceX,
                                         sourceY,
                                         targetX,
                                         targetY,
                                         sourcePosition,
                                         targetPosition,
                                         label,
                                     }: EdgeProps<Edge<EdgeData>>) {
    const [path] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition
    });

    return (
        <>
            <BaseEdge path={path}/>
            <circle r="10" fill="#ff0073">
                <animateMotion dur="2s" repeatCount="indefinite" path={path}/>
            </circle>
        </>
    );
}