define(['dojo/_base/declare',
    'jimu/BaseWidget',
    'jimu/loaderplugins/jquery-loader!https://code.jquery.com/jquery-1.11.2.min.js',
    'esri/arcgis/Portal',
    'esri/arcgis/utils',
    "./LayerLoader",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/ArcGISImageServiceLayer",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/DynamicLayerInfo",
    "esri/layers/FeatureLayer",
    "esri/layers/ImageParameters",
    "esri/layers/ImageServiceParameters",
    "esri/layers/KMLLayer",
    "esri/layers/LayerDrawingOptions",
    "esri/layers/MosaicRule",
    "esri/layers/RasterFunction",
    "esri/layers/VectorTileLayer",
    'esri/layers/WMSLayer', 'esri/dijit/PopupTemplate'],
        function (declare, BaseWidget, $, arcgisPortal, arcgisUtils, LayerLoader, ArcGISDynamicMapServiceLayer, ArcGISImageServiceLayer, ArcGISTiledMapServiceLayer,
                DynamicLayerInfo, FeatureLayer, ImageParameters, ImageServiceParameters, KMLLayer,
                LayerDrawingOptions, MosaicRule, RasterFunction, VectorTileLayer, WMSLayer, PopupTemplate) {
            //To create a widget, you need to derive from BaseWidget.

            return declare([BaseWidget], {
                // Custom widget code goes here

                baseClass: 'jimu-widget-addmapdata',

                //this property is set by the framework when widget is loaded.
                //name: 'AddMapData',


                //methods to communication with app container:

                postCreate: function () {
                    this.inherited(arguments);

                },

                startup: function () {

                    this.inherited(arguments);
                    this.mapdatahook.innerHTML = '<b>List of Results</b>';
                    this.portalQuery();
                },
                
                _portalMap: {},
                portalQuery: function () {
                    var data = this;
                    var OpLayers = {};
                    var myPortal = new arcgisPortal.Portal(this.config.portal);
                    var params = {q: this.config.q, num: this.config.num};
                    myPortal.queryItems(params).then(function (groups){
                        for (var result in groups.results)
                        {
                            var layerTitle = groups.results[result].title;
                            var MapID = groups.results[result].id;
                            data.mapItems.innerHTML += "<li data-portal-item='" + MapID + "'>" +  layerTitle + "</li>";
                            arcgisUtils.getItem(MapID).then(function (eachLayer) {
                                opTitle = eachLayer.item.title;
                                OpLayers[opTitle] = eachLayer;
                                data._portalMap[eachLayer.item.id] = eachLayer;
                            });
                        }
                    });
                },

                loadLayer: function (event){
                    this.inherited(arguments);
                    var data=this;
                    var ID = $(event.target).data('portal-item');
                    var tempMapObj = arcgisUtils.createMap(ID, "map2");
                    tempMapObj.then(function (response) {
                        var tempMap = response.map;
                        for (var j = 0; j < tempMap.graphicsLayerIds.length; j++)
                        {

                            var tempGLayer=tempMap.getLayer(tempMap.graphicsLayerIds[j]);
                            data.map.addLayer(tempGLayer);
                        }

                        for (var i = 1; i < tempMap.layerIds.length; i++)
                        {
                            //This loops skips the first object (Basemap)
                            var tempFLayer=tempMap.getLayer(tempMap.layerIds[i]);
                            data.map.addLayer(tempFLayer);
                            
                        }
                    });
                }


                // onOpen: function(){
                //   console.log('onOpen');
                // },

                // onClose: function(){
                //   console.log('onClose');
                // },

                // onMinimize: function(){
                //   console.log('onMinimize');
                // },

                // onMaximize: function(){
                //   console.log('onMaximize');
                // },

                // onSignIn: function(credential){
                //   /* jshint unused:false*/
                //   console.log('onSignIn');
                // },

                // onSignOut: function(){
                //   console.log('onSignOut');
                // }

                // onPositionChange: function(){
                //   console.log('onPositionChange');
                // },

                // resize: function(){
                //   console.log('resize');
                // }

                //methods to communication between widgets:

            });
        });