import ReactPlayer from "react-player";
import { useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { next } from "../store/slices/player";

export function VideoPlayer() {
    const dispatch = useDispatch()
    const currentVideoId = useAppSelector(state => {
        const {currentModuleIndex, currentLessonIndex, course} = state.player
        return course.modules[currentModuleIndex].lessons[currentLessonIndex].id
    })

    const handleNext = () => dispatch(next())

    return (
        <div className="w-full bg-zinc-950 aspect-video">
            <ReactPlayer
                width="100%"
                height="100%"
                controls
                onEnded={handleNext}
                playing
                url={`https://www.youtube.com/watch?v=${currentVideoId}`}
            />
        </div>
    )
}