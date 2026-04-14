import React from 'react';
import {ConnectionLineComponentProps, getSmoothStepPath, Position, useConnection} from '@xyflow/react';

export default function ConnectionLine({fromX, fromY, toX, toY}: ConnectionLineComponentProps) {
    const {fromHandle, toHandle} = useConnection();

    const [path] = getSmoothStepPath({
        sourceX: fromX,
        sourceY: fromY,
        targetX: toX,
        targetY: toY,
        sourcePosition: fromHandle?.position,
        targetPosition: toHandle?.position,
    });

    return (
        <g>
            <path
                fill="none"
                stroke='gray'
                strokeWidth={1.5}
                className="animated"
                d={path}
            />
            <circle
                cx={toX}
                cy={toY}
                fill="#fff"
                r={3}
                stroke='gray'
                strokeWidth={1.5}
            />
        </g>
    );
};
