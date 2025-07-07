
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { tv } from 'tailwind-variants';

const imageSliderStyles = tv({
    slots: {
        wrapper: "relative overflow-hidden select-none",
        image: "absolute inset-0 w-full h-full object-contain",
        scroller: "absolute inset-y-0 w-2 h-full bg-primary cursor-ew-resize",
        scrollerLine: "absolute inset-y-0 left-1/2 w-0.5 h-full bg-background",
        scrollerHandle: "absolute top-1/2 -left-1.5 w-5 h-5 rounded-full bg-primary border-2 border-background"
    }
});


interface ImageSliderProps extends React.HTMLAttributes<HTMLDivElement> {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
}

const ImageSlider = React.forwardRef<HTMLDivElement, ImageSliderProps>(
    ({ beforeImage, afterImage, beforeLabel = "Before", afterLabel = "After", className, ...props }, ref) => {
        const [sliderPosition, setSliderPosition] = useState(50);
        const containerRef = useRef<HTMLDivElement>(null);

        const { wrapper, image, scroller, scrollerLine, scrollerHandle } = imageSliderStyles();
        
        const handleMove = (clientX: number) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const percent = (x / rect.width) * 100;
            setSliderPosition(percent);
        };

        const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            
            const onMouseMove = (moveEvent: MouseEvent) => {
                handleMove(moveEvent.clientX);
            }

            const onMouseUp = () => {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
            }

            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        };
        
        const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
            const onTouchMove = (moveEvent: TouchEvent) => {
                if (moveEvent.touches.length > 0) {
                    handleMove(moveEvent.touches[0].clientX);
                }
            };

            const onTouchEnd = () => {
                window.removeEventListener('touchmove', onTouchMove);
                window.removeEventListener('touchend', onTouchEnd);
            };

            window.addEventListener('touchmove', onTouchMove);
            window.addEventListener('touchend', onTouchEnd);
        };



        return (
            <div
                ref={containerRef}
                className={cn(wrapper(), className)}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                {...props}
            >
                <div className="relative w-full h-64 max-w-md mx-auto">
                    <img src={beforeImage} alt="Before" className={image()} style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }} />
                    <img src={afterImage} alt="After" className={image()} style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }} />
                    <div
                        className={scroller()}
                        style={{ left: `${sliderPosition}%` }}
                    >
                        <div className={scrollerLine()}></div>
                        <div className={scrollerHandle()}></div>
                    </div>
                </div>
            </div>
        );
    }
);

ImageSlider.displayName = 'ImageSlider';


export { ImageSlider };
