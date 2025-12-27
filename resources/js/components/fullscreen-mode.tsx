import { Maximize, Minimize } from 'lucide-react';
import { useState } from 'react';

const FullScreenMode = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };
    return (
        <button
            onClick={toggleFullscreen}
            className="hidden rounded-md border border-border p-1.5 lg:block"
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
            {isFullscreen ? (
                <Minimize className="h-5 w-5 text-gray-700" />
            ) : (
                <Maximize className="h-5 w-5 text-gray-700" />
            )}
        </button>
    );
};

export default FullScreenMode;
