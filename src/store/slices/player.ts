import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../lib/axios";

interface Course {
    id: number;
    modules: Array<{
        id: number;
        title: string;
        lessons: Array<{
            id: string,
            title: string,
            duration: string
        }>
    }>;
}
interface PlayerState {
    course: Course | null;
    currentModuleIndex: number;
    currentLessonIndex: number;
    isLoading: boolean;
}

const initialState: PlayerState = {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true
}

export const getCourse = createAsyncThunk(
    'player/get',
    async () => {
        const response = await api.get('/courses/1')

        return response.data
    }
) 

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        play: (state, action: PayloadAction<[number, number]>) => {
            state.currentModuleIndex = action.payload[0]
            state.currentLessonIndex = action.payload[1]
        },
        next: (state) => {
            const {currentModuleIndex, currentLessonIndex} = state

            const nextLessonIndex = currentLessonIndex + 1
            const nextLesson = state.course?.modules[currentModuleIndex].lessons[nextLessonIndex]

            if(nextLesson) {
                state.currentLessonIndex = nextLessonIndex
            } else {
                const nextModuleIndex = currentModuleIndex + 1
                const nextModule = state.course?.modules[nextModuleIndex]

                if(nextModule) {
                    state.currentModuleIndex = nextModuleIndex
                    state.currentLessonIndex = 0
                }
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(getCourse.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getCourse.fulfilled, (state, action) => {
            state.course = action.payload
            state.isLoading = false
        })
    },
})

export const player = playerSlice.reducer

export const { play, next } = playerSlice.actions

export const useCurrentLesson = () => {
    return useAppSelector(state => {
        const {currentModuleIndex, currentLessonIndex} = state.player
        
        const currentModule = state.player.course?.modules[currentModuleIndex]
        const currentLesson = currentModule?.lessons[currentLessonIndex]
    
        return {currentModule, currentLesson}
    })
}

export const useIsLoading = () => {
    return useAppSelector(state => {
        const {isLoading} = state.player
        return {isLoading}
    })
}
