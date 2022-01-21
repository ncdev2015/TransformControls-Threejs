<template>
  <div id="viewerjs"></div>
</template>

<script>
import ViewerJS from './classes/viewer.js'
export default {
  name: 'Viewer',
  componentes: {
    ViewerJS
  },
  data() {
    return {
      width: 100,
      height: 100,
      viewer: null
    }
  },
  mounted() {
    this.initViewer();
    this.addViewer();
  },
  methods: {
    initViewer() {
      this.viewer = new ViewerJS(window.innerWidth, window.innerHeight);
    },
    addViewer() {
      document.getElementById("viewerjs").appendChild(this.viewer.renderer.domElement);
    }
  },  
}
</script>

<style scoped>
  #viewer {
    float: left;
  }
</style>