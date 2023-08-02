import ReactPlayer from "react-player";
import { useAppSelector } from "../store";

export function VideoPlayer() {
    const currentVideoId = useAppSelector(state => {
        const {currentModuleIndex, currentLessonIndex, course} = state.player
        return course.modules[currentModuleIndex].lessons[currentLessonIndex].id
    })
    
    return (
        <div className="w-full bg-zinc-950 aspect-video">
            <ReactPlayer
                width="100%"
                height="100%"
                controls
                url={`https://www.youtube.com/watch?v=${currentVideoId}`}
            />
        </div>
    )
}