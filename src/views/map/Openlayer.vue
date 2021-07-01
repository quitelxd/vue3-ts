<template>
    <div id="map">
    </div>
</template>
<script lang="ts">
    import {defineComponent, reactive, onMounted} from 'vue';
    import 'ol/ol.css';
    import {Map, View} from 'ol';
    import TileLayer from 'ol/layer/Tile';
    import XYZ from 'ol/source/XYZ'
    import {transform} from 'ol/proj'

    export default defineComponent({
        name: "Openlayer",
        setup() {
            let data = reactive({
                map: null,
                mapId: '',
                zoom: 10,
                view: null,
                point: [117.0259090203891, 36.53735004794639]
            })
            let init = () => {
                return new Promise((resolve) => {
                    data.map = new Map({
                        target: 'map',
                        layers: [
                            new TileLayer({
                                source: new XYZ({
                                    crossOrigin: 'anonymous',
                                    url: 'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
                                }),
                                spatialReference: {
                                    projection: 'EPSG:3857'
                                },
                                className: 'dt ol-layer',
                                zIndex: 2,
                            })
                        ],
                        view: new View({
                            center: transform(data.point, 'EPSG:4326', 'EPSG:3857'),
                            zoom: 7.7,
                            maxZoom: 18,
                            minZoom: 1,
                        })
                    });
                    resolve('成功');
                })
            }
            onMounted(() => {
                init();
            })
            return {
                data,
                init
            }
        }
    })
</script>

<style scoped lang="less">
    #map {
        height: 100%;
    }
</style>

