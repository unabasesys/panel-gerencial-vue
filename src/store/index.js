import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: {
            titulo: '',
            estado: false,
            color: '#03D6F9',
            percent: 0,
        },

        tokens: {
            esp_madrid: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjEwNy4yMy4xNzkuMjQyIiwicG9ydCI6IjgyMDEiLCJuYW1lIjoiUFJJTU9CVUVOT1NBSVJFU1MuTCIsImlkIjoiMjE4MzUiLCJpYXQiOjE2NTA5MDgwMDYsImV4cCI6MTY4MjQ0NDAwNn0.lVNTc1jO8KF-2cF9PRJgXoy2dVPRb_1jAx8uS5zN5Sg',
            esp_barcelona: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjEwNy4yMy4xNzkuMjQyIiwicG9ydCI6Ijg1MDEiLCJuYW1lIjoiUFJJTU9CQVJDRUxPTkEiLCJpZCI6IjMxNzQ1IiwiaWF0IjoxNjUwOTA1ODE4LCJleHAiOjE2ODI0NDE4MTh9.b4EfBvsZEu00ntI_lKVsZXQv4zrLfgtpwI0qQxNFalw',
            arg: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjQ0LjE5OS4xNjEuMTUxIiwicG9ydCI6IjgxMDAiLCJuYW1lIjoiUFJJTU9DT05URU5UQVJHRU5USU5BIiwiaWQiOiIyNDg2NSIsImlhdCI6MTY1ODc2MjM4MSwiZXhwIjoxNjkwMjk4MzgxfQ.mBbzyY313rq0eK1N8kqX_1vFs5eJfLUz8HJV-T24pII',
            mex: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjEwNy4yMy4xNzkuMjQyIiwicG9ydCI6Ijg0MDAiLCJuYW1lIjoiUFJJTU9DT05URU5UTUVYSUNPIiwiaWQiOiIxMTk1MiIsImlhdCI6MTY0NDkyOTkzNiwiZXhwIjoxNjc2NDY1OTM2fQ.Xcs40HRr-7ecirgMX85ySYvHYQ51RRAmhk3ZkvKbrr8',
            chile: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjMuMjEzLjE4Ny4xNTciLCJwb3J0IjoiODUyNSIsIm5hbWUiOiJQUklNT0NPTlRFTlQiLCJpZCI6IjEzMzE3IiwiaWF0IjoxNjQ2MzE4NTU5LCJleHAiOjE2Nzc4NTQ1NTl9.bquXHUvnsyUdLaXoIrC17oSeqa0yaqgtcQIBJ3y0HPs',
            brasil: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjEwNy4yMy4xNzkuMjQyIiwicG9ydCI6IjgxMDAiLCJuYW1lIjoiUFJJTU9DT05URU5UQlJBU0lMIiwiaWQiOiI1NDkxIiwiaWF0IjoxNjQ0OTI5NTk4LCJleHAiOjE2NzY0NjU1OTh9.VrtXBJQw1NpAlteIq7pCorZWI_B-_cgVIecBha6Yerw'
        },

        aside: {
            estado: false,
        },

        negocio: {
            cierre_compras: null,
        },

        negocios: [],
        cards: []


    },
    mutations: {
        mostrarLoading(state, payload) {
            state.loading.titulo = payload.titulo
            state.loading.estado = true
            state.loading.color = payload.color
            state.loading.percent = payload.percent
        },

        ocultarLoading(state, payload) {
            state.loading.estado = false
            state.loading.percent = payload.percent
        },
        mostrarAside(state) {
            state.aside.estado = true
        },

        ocultarAside(state) {
            state.aside.estado = false
        },

        //Cambiar estados de un negocio
        setNegocio(state, payload) {
            state.negocio.cierre_compras = payload.cierre_compras
        },

        addNegocio(state, payload) {
            state.negocios = payload
        },

        addDataCards(state, payload) {
            state.cards = payload
        },

    },
    getters: {
        getNegocios: state => state.negocios,
        getDataCards: state => state.cards
    },
    actions: {},
    modules: {}
})