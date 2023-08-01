import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";

interface ModuleProps {
    moduleIndex: number;
    title: string;
    amoutOfLessons: number;

}

export function Module({moduleIndex, title, amoutOfLessons}: ModuleProps) {
    return (
        <div>
            <button className="flex w-full items-center gap-3 bg-zinc-800 p-4">
                <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
                    {moduleIndex + 1}
                </div>
                <div className="flex flex-col gap-1 text-left">
                    <strong>
                        {title}
                    </strong>
                    <span className="text-xs text-zinc-400">
                        {`${amoutOfLessons} classes`}
                    </span>
                </div>
                <ChevronDown className="w-5 h-5 ml-auto text-zinc-400"/>
            </button>

            <nav className="relative flex flex-col gap-4 p-6">
                <Lesson title={'Redux Fundamentals'} duration={'09:13'}/>
                <Lesson title={'Redux Fundamentals'} duration={'09:13'}/>
                <Lesson title={'Redux Fundamentals'} duration={'09:13'}/>
            </nav>
        </div>
    
    )
}