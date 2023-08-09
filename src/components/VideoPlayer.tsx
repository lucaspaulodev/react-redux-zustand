import ReactPlayer from "react-player";
import { next, useCurrentLesson, useIsLoading } from "../store/slices/player";
import { useAppDispatch, useAppSelector } from "../store";
import { Loader } from "lucide-react";

export function VideoPlayer() {
    const {isLoading} = useIsLoading()
    const dispatch = useAppDispatch()

    const {currentLesson} = useCurrentLesson()

    const handleNext = () => dispatch(next())

    return (
        <div className="w-full bg-zinc-950 aspect-video">
            {isLoading ? (
                <div className="flex h-full items-center justify-center">
                    <Loader className="w-6 h-6 text-zinc-400 animate-spin"/>
                </div>
            ) : (
                <ReactPlayer
                    width="100%"
                    height="100%"
                    controls
                    onEnded={handleNext}
                    // playing
                    url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
                />
            )}
            
        </div>
    )
}