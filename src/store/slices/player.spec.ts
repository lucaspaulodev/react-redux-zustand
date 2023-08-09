import {describe, expect, it} from 'vitest'
import { next, play, player as reducer } from './player'

const exampleInitialState = {
    course: {
        id: 1,
        modules: [
            {
              id: 1,
              title: 'Iniciando com React',
              lessons: [
                { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
                { id: 'w-DW4DhDfcw', title: 'Estilização do Post', duration: '10:05' },
              ],
            },
            {
              id: 2,
              title: 'Estrutura da aplicação',
              lessons: [
                { id: 'gE48FQXRZ_o', title: 'Componente: Comment', duration: '13:45' },
                { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
              ],
            },
        ],
    },
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: false,
}

describe('player slice', () => {
    it('should be able to play', () => {
        const state = reducer(exampleInitialState, play([0, 1]))

        expect(state.currentModuleIndex).toEqual(0)
        expect(state.currentLessonIndex).toEqual(1)
    })

    it('should be able to play next video', () => {
        const state = reducer(exampleInitialState, next())

        expect(state.currentModuleIndex).toEqual(0)
        expect(state.currentLessonIndex).toEqual(1)
    })

    it('should be able to jump to the next module and play the first video of this next module', () => {
        const state = reducer({
            ...exampleInitialState,
            currentLessonIndex: 1
        }, next())

        expect(state.currentModuleIndex).toEqual(1)
        expect(state.currentLessonIndex).toEqual(0)
    })

    it('should not be able to update the current module and current lesson if there is no next current module or current lesson', () => {
        const state = reducer({
            ...exampleInitialState,
            currentLessonIndex: 1,
            currentModuleIndex: 1
        }, next())

        expect(state.currentModuleIndex).toEqual(1)
        expect(state.currentLessonIndex).toEqual(1)
    })
})