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