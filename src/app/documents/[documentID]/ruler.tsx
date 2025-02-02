import { useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa'
import { useStorage, useMutation } from '@liveblocks/react';
import { LEFT_MARGIN_DEFAULT, PAGE_WIDTH, RIGHT_MARGIN_DEFAULT } from '@/constants';

const markers = Array.from({ length: 83 }, (_, i) => i);

export const Ruler = () => {

    const leftMargin = useStorage((root) => root.leftMargin) ?? LEFT_MARGIN_DEFAULT;
    const setLeftMargin = useMutation(({ storage }, position: number) => {
        storage.set("leftMargin", position);
    }, []);

    const rightMargin = useStorage((root) => root.rightMargin) ?? RIGHT_MARGIN_DEFAULT;
    const setRightMargin = useMutation(({ storage }, position: number) => {
        storage.set("rightMargin", position);
    }, []);

    console.log(rightMargin, 'rightMargin')
    const [isDraggingLeft, setIsDraggingLeft] = useState(false);
    const [isDraggingRight, setIsDraggingRight] = useState(false);
    const rulerRef = useRef<HTMLDivElement>(null);

    const handleLeftMouseDown = () => {
        setIsDraggingLeft(true);
    }

    const handleRightMouseDown = () => {
        setIsDraggingRight(true);
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        const MINIMUM_SPACE = 100;

        if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
            const container = rulerRef.current.querySelector('#ruler-container');

            if (container) {
                const containerRect = container.getBoundingClientRect();
                const relativeX = e.clientX - containerRect.left;
                const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));

                if (isDraggingLeft) {
                    const maxLeftPosition = PAGE_WIDTH - rightMargin - MINIMUM_SPACE;
                    const newLeftPsotion = Math.min(rawPosition, maxLeftPosition);
                    setLeftMargin(newLeftPsotion); // Todo make collaboration
                } else if (isDraggingRight) {
                    const maxRightPosition = PAGE_WIDTH - (leftMargin + MINIMUM_SPACE);
                    const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0);
                    const constrainedRightPosition = Math.min(newRightPosition, maxRightPosition);
                    setRightMargin(constrainedRightPosition)
                }
            }

        }
    }

    const handleMouseUp = () => {
        setIsDraggingLeft(false);
        setIsDraggingRight(false);
    }

    const handleLeftDoubleClick = () => {
        setLeftMargin(LEFT_MARGIN_DEFAULT);
    }

    const handleRightDoubleClick = () => {
        setRightMargin(RIGHT_MARGIN_DEFAULT); 
    }

    return (
        <div 
            ref={rulerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="w-[816px] mx-auto h-6 border-b border-gray-300 flex items-end relative select-none print:hidden">
            <div id="ruler-container" className="w-full h-full relative">
                <Marker 
                    position={leftMargin}
                    isLeft
                    isDragging={isDraggingLeft}
                    onDoubleClick={handleLeftDoubleClick}
                    onMouseDown={handleLeftMouseDown}
                />
                <Marker 
                    position={rightMargin}
                    isLeft={false}
                    isDragging={isDraggingRight}
                    onDoubleClick={handleRightDoubleClick}
                    onMouseDown={handleRightMouseDown}
                />
                <div className="absolute inset-x-0 bottom-0 h-full">
                    <div className="relative h-full w-[816px]">
                        {
                            markers.map((marker) => {
                                const position = (marker * PAGE_WIDTH / 82);

                                return (
                                    <div 
                                        key={marker}
                                        className="absolute bottom-0"
                                        style={{ left: `${position}px`}}
                                    >
                                        { marker % 10 === 0 && (
                                            <>
                                                <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500" />
                                                <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">{ marker / 10 + 1}</span>
                                            </>
                                        )}

                                        { marker % 5 === 0 && marker % 10 !== 0 && (
                                            <div className="absolute bottom-0 w-[1px] h-1.5 bg-neutral-400"/>
                                        )}


                                          { marker % 5 !== 0 && (
                                            <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-300"/>
                                        )}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

interface MarkerProps {
    position: number;
    isLeft: boolean;
    isDragging: boolean;
    onMouseDown: () => void;
    onDoubleClick: () => void;
}

const Marker = ({ 
    isDragging,
    isLeft,
    onDoubleClick,
    onMouseDown,
    position 
}: MarkerProps) => {
    
    return (
        <div
            className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
            style={{ [isLeft ? "left": "right"]: `${position}px` }}    
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
        >
            <FaCaretDown className="absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2"/>
            <div
                className="absolute left-1/2 top-4 transform -translate-x-1/2"
                style={{
                    height: "100vh",
                    width: "1px",
                    transform: "scaleX(0.5)",
                    background: "#3b72f6",
                    display: isDragging ? "block" : "none"
                }}
            >

            </div>
        </div>
    )

}