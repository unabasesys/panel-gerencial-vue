import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        spinner: {
            visible: false,
        },
        loading: {
            titulo: '',
            estado: false,
            color: '#03D6F9',
            percent: 0,
        },
        user: null,

        tipoCambio: [],

        tokens: {
            esp_madrid: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjQ0LjE5OS4xNjEuMTUxIiwicG9ydCI6Ijg1MDAiLCJuYW1lIjoiUFJJTU9CVUVOT1NBSVJFU1MuTCIsImlkIjoiMjc2MjYiLCJpYXQiOjE2NTg3NjQ3NDcsImV4cCI6MTY5MDMwMDc0N30.yUAmyZEIfraEutcSwrGJ-HWyS4A30DlqfwMcvmy5L4g',
            esp_barcelona: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjEwNy4yMy4xNzkuMjQyIiwicG9ydCI6Ijg1MDEiLCJuYW1lIjoiUFJJTU9CQVJDRUxPTkEiLCJpZCI6IjMxNzQ1IiwiaWF0IjoxNjUwOTA1ODE4LCJleHAiOjE2ODI0NDE4MTh9.b4EfBvsZEu00ntI_lKVsZXQv4zrLfgtpwI0qQxNFalw',
            arg: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjQ0LjE5OS4xNjEuMTUxIiwicG9ydCI6IjgxMDAiLCJuYW1lIjoiUFJJTU9DT05URU5UQVJHRU5USU5BIiwiaWQiOiIyNDg2NSIsImlhdCI6MTY1ODc2MjM4MSwiZXhwIjoxNjkwMjk4MzgxfQ.mBbzyY313rq0eK1N8kqX_1vFs5eJfLUz8HJV-T24pII',
            mex: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjQ0LjE5OS4xNjEuMTUxIiwicG9ydCI6Ijg1NTAiLCJuYW1lIjoiUFJJTU9DT05URU5UTUVYSUNPIiwiaWQiOiIxNDgyOCIsImlhdCI6MTY1ODc2NDMxOSwiZXhwIjoxNjkwMzAwMzE5fQ.ew8CpFqPP5F2cUeztEYcA924viKeQZQs4uN__ElLISE',
            chile: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjMuMjEzLjE4Ny4xNTciLCJwb3J0IjoiODUzOCIsIm5hbWUiOiJQUklNT0NPTlRFTlQiLCJpZCI6IjIzOTM2IiwiaWF0IjoxNjY3NDE0MDA3LCJleHAiOjE2OTg5NTAwMDd9.NAncGr-r0Z_UzNgBU5gkRDRmUCqprUSTfLzywB400UI',
            brasil: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6IjQ0LjE5OS4xNjEuMTUxIiwicG9ydCI6Ijg0NTAiLCJuYW1lIjoiUFJJTU9DT05URU5UQlJBU0lMIiwiaWQiOiIzMjIwNiIsImlhdCI6MTY1ODc2NDQ3MCwiZXhwIjoxNjkwMzAwNDcwfQ.TGu24h8E35ZPR6Zbqjk5k8sW_HhdNtE5pgX4eF5eFwc'
        },

        sid: '',

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
        SET_SPINNER(state, payload) {
            state.spinner = payload
        },
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

        setTipoCambioStore(state, payload) {
            state.tipoCambio = payload
        },

        setUser(state, payload) {
            state.user = payload
        },

    },
    getters: {
        getNegocios: state => state.negocios,
        getDataCards: state => state.cards,
        getTipoCambio: state => state.tipoCambio,
        getUser: state => state.user,
        getSpinner: state => state.spinner,
    },
    actions: {

    },
    modules: {}
})