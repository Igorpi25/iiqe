import Vue from 'vue'
import Router from 'vue-router'
import { quiz_1, quiz_3 } from './quizList' 

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/components/Home.vue')
        },
        {
            path: '/paper1',
            name: 'paper1',
            component: () => import('@/components/Quiz.vue'),
            props: {
                name: 'Paper 1',
                quizList: quiz_1,
                progressKey: 'paper_1'
            }
        },
        {
            path: '/paper3',
            name: 'paper3',
            component: () => import('@/components/Quiz.vue'),
            props: {
                name: 'Paper 3',
                quizList: quiz_3,
                progressKey: 'paper_3'
            }
        }
    ]
})