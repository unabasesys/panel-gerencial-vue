<template>
    <div>
      <div style="margin-right: 50px; margin-left: 50px;" class="mt-2" v-if="!statusSpinner">
        <div class="loader-line"></div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import { SemipolarSpinner } from 'epic-spinners'
  export default {
    props: ['statusSpinner'],
    components: {
      SemipolarSpinner,
    },
    data() {
      return {
        activeProgress: false,
      }
    },
  
    computed: {
      ...mapGetters({
        spinner: 'getSpinner',
      }),

    },
  }
  </script>
  
  <style scoped>
  .loading-screen {
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 9999;
    top: -10vh;
    right: -5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
  }
  
  .loader-line {
    width: 100%;
    height: 3px;
    position: relative;
    overflow: hidden;
    background-color: #F6F7F8;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
  }
  
  .loader-line:before {
    content: '';
    position: absolute;
    left: -50%;
    height: 3px;
    width: 40%;
    background-color: #E4E7EC;
    -webkit-animation: lineAnim 1s linear infinite;
    -moz-animation: lineAnim 1s linear infinite;
    animation: lineAnim 1s linear infinite;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
  }
  
  @keyframes lineAnim {
    0% {
      left: -40%;
    }
    50% {
      left: 20%;
      width: 80%;
    }
    100% {
      left: 100%;
      width: 100%;
    }
  }
  </style>