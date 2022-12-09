import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        ventasCompras: [],
        spinner: {
            visible: false,
            indicadores: false,
            ventas_mes: false,
            rentabilidad: false,
            mis_tareas: false,
            ventas_cliente: false,
            ventas_compras: false,
            costos_mes: false
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
            esp_madrid: process.env.VUE_APP_ESP_MADRID,
            esp_barcelona: process.env.VUE_APP_ESP_BARCELONA,
            arg: process.env.VUE_APP_ARG,
            mex: process.env.VUE_APP_MEX,
            chile: process.env.VUE_APP_CHILE,
            brasil: process.env.VUE_APP_BRASIL
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

        setVentasCompras(state, payload) {
            state.ventasCompras = payload
        },

    },
    getters: {
        getNegocios: state => state.negocios,
        getDataCards: state => state.cards,
        getTipoCambio: state => state.tipoCambio,
        getUser: state => state.user,
        getSpinner: state => state.spinner,
        getVentasCompras: state => state.ventasCompras
    },
    actions: {

    },
    modules: {}
})