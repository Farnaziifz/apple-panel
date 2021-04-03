<template>
  <div class="main">
    <div class="map-container" :id="mapId"></div>
    <div
      class="go-to-person-location"
      @click="goToPersonLocation"
      :style="findPersonStyle"
    ></div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import L from "leaflet";
import { Icon } from "leaflet";
import Routing from "leaflet-routing-machine";

export default {
  name: "mapComponent",
  data() {
    return {
      userLat: null,
      userLng: null,
      routingControl: null,
      updateUserLocationInterval: null,
    };
  },
  props: {
    zoom: String,
    center: Array,
    draggable: Boolean,
    markerDraggable: Boolean,
    routing: Array,
    position: Array,
    findPersonStyle: Object,
    mapId: String,
    mapDraggable: Boolean,
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  mounted() {
    // Routing needs user's location, So if it doesn't existed,
    // there is no need to egt user location
    // Hint : You absolutely need 'position' property
    // in the absence of 'routing'
    if (!this.routing) {
      this.userLat = this.position[0];
      this.userLng = this.position[1];
      this.mapInit();
    } else {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
  },
  methods: {
    // get user location
    getUserLocation() {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    },
    // set userLat and userLng and call mapInit
    showPosition: function(position) {
      this.userLat = position.coords.latitude;
      this.userLng = position.coords.longitude;
      this.mapInit();
    },
    // initiate map init
    mapInit() {
      const _this = this;

      delete Icon.Default.prototype._getIconUrl;
      Icon.Default.mergeOptions({
        iconUrl: require("../../assets/img/public/map-pin.png"),
        iconRetinaUrl: require("../../assets/img/public/map-pin.png"),
        iconSize: [41, 45],
      });
      // default option
      let mapOptions = {
        center: [0, 0],
        zoom: this.zoom,
        maxZoom: 60,
        minZoom: 0,
        attributionControl: false,
      };
      this.map = L.map(this.mapId, mapOptions);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        this.map
      );
      // Set Routing if existed
      if (this.routing) {
        this.createRoutingPathOnMap(
          this.userLat,
          this.userLng,
          this.routing[0],
          this.routing[1]
        );
      } else {
        this.marker = L.marker([this.position[0], this.position[1]], {
          title: "موقعیت شما",
          draggable: this.markerDraggable ? true : false,
        })
          .addTo(this.map)
          .on("dragend", function(e) {
            // console.log(_this.marker.getLatLng().lat)
            // console.log(_this.marker.getLatLng().lng)
            _this.mapPositionUpdate(
              _this.marker.getLatLng().lat,
              _this.marker.getLatLng().lng
            );
          });
        this.map.panTo(new L.LatLng(this.position[0], this.position[1]));
      }

      // mapDraggable from props
      if (this.mapDraggable) {
        // map move event
        this.map.on("move", function() {
          _this.marker.setLatLng(_this.map.getCenter());
        });

        // return lat and lng to parent (retun to emit)
        this.map.on("dragend", function() {
          let position = _this.marker.getLatLng();
          _this.mapPositionUpdate(position.lat, position.lng);
        });
      }
    },
    // return lat and lng by emit
    mapPositionUpdate(posLat, posLng) {
      this.$emit("mapPositionUpdate", posLat, posLng);
    },
    // update user location in routing
    updateUserLocation() {
      const _this = this;

      if (this.routing) {
        this.updateUserLocationInterval = setInterval(() => {
          navigator.geolocation.getCurrentPosition(function(position) {
            _this.userLat = position.coords.latitude;
            _this.userLng = position.coords.longitude;
          });

          this.routingControl.spliceWaypoints(0, 2);
          this.createRoutingPathOnMap(
            this.userLat,
            this.userLng,
            this.routing[0],
            this.routing[1]
          );
        }, 10000);
      }
    },
    // go to person location
    goToPersonLocation() {
      this.map.panTo(new L.LatLng(this.userLat, this.userLng));
    },
    // create routing path on map
    createRoutingPathOnMap(userLat, userLng, destLat, destLng) {
      this.routingControl = L.Routing.control({
        waypoints: [L.latLng(userLat, userLng), L.latLng(destLat, destLng)],
        addWaypoints: false,
        routeWhileDragging: this.draggable,
        show: false,
        lineOptions: {
          styles: [{ color: "#0f63c4", opacity: 1, weight: 10 }],
        },
      }).addTo(this.map);
    },
  },
  watch: {
    // watch for change in routing and call createRoutingPathOnMap
    routing: function(newVal, prevVal) {
      this.routingControl.spliceWaypoints(0, 2);
      this.createRoutingPathOnMap(
        this.userLat,
        this.userLng,
        newVal[0],
        newVal[1]
      );
    },
  },
  // clear updateUserLocationInterval interval
  destroyed() {
    clearInterval(this.updateUserLocationInterval);
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 200px;
  position: relative;
  z-index: 8;

  .map-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>

<style lang="scss">
.leaflet-routing-container {
  display: none !important;
}
.go-to-person-location {
  width: 54px;
  height: 54px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  background-size: 100%;
  background-image: url("../../assets/img/public/find-in-location.png");
  z-index: 100000000000;
  border-radius: 50%;
}
.centerMarker {
  position: absolute;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
}
</style>
