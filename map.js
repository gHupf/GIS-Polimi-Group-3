//Define OSM
var osm = new ol.layer.Tile({
    title: 'OpenStreetMap',
    type: 'base',
    visible: true,
    source: new ol.source.OSM()
});
//Define Google Maps (called from a WMS)
var gmaps = new ol.layer.Tile({
    title: 'Google Maps',
    type: 'base',
    visible: false,
    source: new ol.source.TileImage({ url: 'http://mt1.google.com/vt/lyrs=m@113&hl=en&&x={x}&y={y}&z={z}' })
});
//Define Stamen Watercolor
var stamenWatercolor = new ol.layer.Tile({
    title: 'Stamen Watercolor',
    type: 'base',
    visible: false,
    source: new ol.source.Stamen({
        layer: 'watercolor'
    })
});
//Add GlobeLand30 via WMS
var coverland = new ol.layer.Image({
    title: 'GlobeLand30 <img src="https://i.imgur.com/2mgZ8UK.png">',
    source: new ol.source.ImageWMS({
        url: 'http://localhost:8082/geoserver/wms',
        params: {'LAYERS': 'group_three:GlobeLand30'},
        serverType: 'geoserver',
        crossOrigin: 'anonymous'
    }),
    opacity: 0.7,
    visible: false
});
//Define the load feature
var geojsonFormat = new ol.format.GeoJSON();
    function loadFeatures(response) {
        vectorOne.addFeatures(geojsonFormat.readFeatures(response));
        vectorTwo.addFeatures(geojsonFormat.readFeatures(response));
        vectorThree.addFeatures(geojsonFormat.readFeatures(response));
    }
//Add the Group 3 borders via WFS
var vectorOne = new ol.source.Vector({
    loader: function(extent, resolution, projection) {
        var url = 'http://localhost:8082/geoserver/group_three/ows?service=WFS&' +
        'version=2.0.0&request=GetFeature&typeName=group_three:borders&' +
        'outputFormat=text/javascript&srsname=EPSG:3857&' +
        'format_options=callback:loadFeatures';
        $.ajax({url: url, dataType: 'jsonp'})
    }
});
var groupBorders = new ol.layer.Vector ({
    title: 'Border Group 3',
    source: vectorOne,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgb(0, 0, 0)',
            width: 2,
            lineDash: [2.5, 4, .5, 4, .5, 4]
        })
    })
});
//Add all the points via WFS and style them according to their class
var vectorTwo = new ol.source.Vector({
    loader: function(extent, resolution, projection) {
        var url = 'http://localhost:8082/geoserver/group_three/ows?service=WFS&' +
        'version=2.0.0&request=GetFeature&typeName=group_three:Pointswithgroup&' +
        'outputFormat=text/javascript&srsname=EPSG:3857&' +
        'format_options=callback:loadFeatures';
        $.ajax({url: url, dataType: 'jsonp'})
    }
});

//Add the vector used for the points of our group
var vectorThree = new ol.source.Vector({
    loader: function(extent, resolution, projection) {
        var url = 'http://localhost:8082/geoserver/group_three/ows?service=WFS&' +
        'version=2.0.0&request=GetFeature&typeName=group_three:points3857&' +
        'outputFormat=text/javascript&srsname=EPSG:3857&' +
        'format_options=callback:loadFeatures';
        $.ajax({url: url, dataType: 'jsonp'})
    }
});
var styleFunction1 = function(feature, resolution) {
    if(feature.get('Group') != '3'){
        if(feature.get('class') === 'Artificial surface') {
            icon = 'icons/Artificial_surfaces.svg'
        } else if(feature.get('class') === 'Bare land') {
            icon = 'icons/Barrenlands.svg'
        } else if(feature.get('class') === 'Cultivated land') {
            icon = 'icons/Cultivated_land.svg'
        } else if(feature.get('class') === 'Forest') {
            icon = 'icons/Forests.svg'
        } else if(feature.get('class') === 'Grassland') {
            icon = 'icons/Grasslands.svg'
        } else if(feature.get('class') === 'Shrubland') {
            icon = 'icons/Shrublands.svg'
        } else if(feature.get('class') === 'Water body') {
            icon = 'icons/Waterbodies.svg'
        } else if(feature.get('class') === 'Wetland') {
            icon = 'icons/Wetland.svg'
        }
        return [new ol.style.Style({
            image: new ol.style.Icon({
                src: icon,
                scale: 0.5,
                opacity: 0.7,

            })
        })]
    }
    
};
var styleFunction2 = function(feature, resolution) {
    if(feature.get('Group') == '3'){
        if(feature.get('class') === 'Artificial surface') {
            icon = 'icons/Artificial_surfaces.svg'
        } else if(feature.get('class') === 'Bare land') {
            icon = 'icons/Barrenlands.svg'
        } else if(feature.get('class') === 'Cultivated land') {
            icon = 'icons/Cultivated_land.svg'
        } else if(feature.get('class') === 'Forest') {
            icon = 'icons/Forests.svg'
        } else if(feature.get('class') === 'Grassland') {
            icon = 'icons/Grasslands.svg'
        } else if(feature.get('class') === 'Shrubland') {
            icon = 'icons/Shrublands.svg'
        } else if(feature.get('class') === 'Water body') {
            icon = 'icons/Waterbodies.svg'
        } else if(feature.get('class') === 'Wetland') {
            icon = 'icons/Wetland.svg'
        }
        return [new ol.style.Style({
            image: new ol.style.Icon({
                src: icon,
                scale: 0.7,
                opacity: 1.0,

            })
        })]
    }  
};
var points = new ol.layer.Vector ({
    title: 'Other Points',
    source: vectorTwo,
    style: styleFunction1
});

//Add the points of our group
var ourpoints = new ol.layer.Vector ({
    title: 'Our Points',
    source: vectorThree,
    style: styleFunction2
});    

//Add the metro lines
var metro = new ol.layer.Vector({
    title: 'Metro lines',
    source: new ol.source.Vector({
        url: 'data/metro.geojson',
        format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: [0, 0, 0, 1.0],
            opacity: 1,
            width: 5
        }),
        zIndex: 1
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: [255, 153, 0, 1.0],
            opacity: 1,
            width: 4,
            lineDash: [4, 10]
        }),
        zIndex: 2
    })
});
//Add the basemaps and the Layerswitcher
var map = new ol.Map ({
    target: document.getElementById('map'),
    layers: [
    new ol.layer.Group({
        title: 'Basemaps',
        layers: [stamenWatercolor, gmaps, osm]
    }),
    new ol.layer.Group({
        title:'Overlay Layers',
        layers: [coverland, metro, points, ourpoints, groupBorders]
    })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([9.169052, 45.464674]),
        zoom: 12.3,
    }),
    controls: ol.control.defaults({attribution: false}).extend([
     new ol.control.ScaleLine(),
     new ol.control.FullScreen(),
     new ol.control.Attribution({
         collapsible: true,
         collapsed: true,
     }),
     new ol.control.MousePosition({
         coordinateFormat: ol.coordinate.createStringXY(3),
         projection: 'EPSG: 4326'
     })
     ])
});
//Define the Layerswitcher
var layerSwitcher = new ol.control.LayerSwitcher({});
map.addControl(layerSwitcher);
//Define Popup
var elementPopup = document.getElementById('popup');
var popup = new ol.Overlay({
    element: elementPopup
});
map.addOverlay(popup);
//Make a check for the popup to work only for the DOTS not for the borders
map.on('click', function(event) {
    var feature = map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
        if (layer === points || ourpoints) {
            return feature;
        }
    });
    if (feature != null) {
        if (feature.get('comment') != null) {
            comment = feature.get('comment')
        }
        else {
            comment = "<i>No comment added</i>";
        };
        var pixel = event.pixel;
        var coord = map.getCoordinateFromPixel(pixel);
        popup.setPosition(coord);
        $(elementPopup).attr('title', '<b>Attributes</b>');
        $(elementPopup).attr('data-content', '<b>Point number: </b>' + '&ensp;' + feature.get('id') +
            '</br><b>Class: </b>' + '&emsp;&emsp;&emsp;&emsp;&nbsp;' + feature.get('class') +
            '</br><b>Certainty: </b>' + '&emsp;&emsp;&ensp;' + feature.get('certainty') +
            '</br><b>Comment: </b>' + '&emsp;&emsp;&nbsp;' + comment +
            '</br><b>When was it taken: </b>' + feature.get('time') +
            '</br><b>Image 1: </b>' + '<img id="north" alt="North Image" width="230" height="150" onclick="window.open(this.src)" onmouseover="" style="cursor: pointer;" />' +
            '</br><b>Image 2: </b>' + '<img id="east" alt="East Image" width="230" height="150" onclick="window.open(this.src)" onmouseover="" style="cursor: pointer;" />' +
            '</br><b>Image 3: </b>' + '<img id="south" alt="South Image" width="230" height="150" onclick="window.open(this.src)" onmouseover="" style="cursor: pointer;" />' +
            '</br><b>Image 4: </b>' + '<img id="west" alt="West Image" width="230" height="150" onclick="window.open(this.src)" onmouseover="" style="cursor: pointer;" />');
        $(elementPopup).popover({'placement': 'top', 'html': true});
        $(elementPopup).popover('show');

        document.getElementById('north').src = feature.get('link_n');
        document.getElementById('east').src = feature.get('link_e');
        document.getElementById('south').src = feature.get('link_s');
        document.getElementById('west').src = feature.get('link_w');
    }
    else {
        $(elementPopup).popover({'html': true});
        $(elementPopup).popover('hide');
    }
});

//GetFeatureInfo as popup
var featureInfo = document.getElementById('get-feature-info');
var infoPopup = new ol.Overlay({
    element: featureInfo
});
map.addOverlay(infoPopup);

map.on('singleclick', function(event) {
    map.forEachLayerAtPixel(event.pixel, function(layer) {
        if (layer===coverland){
            var pixel = event.pixel;
            var coord = map.getCoordinateFromPixel(pixel);
            infoPopup.setPosition(coord);
            document.getElementById('get-feature-info').innerHTML = '';
            var viewResolution = (map.getView().getResolution());
            var url = coverland.getSource().getGetFeatureInfoUrl(event.coordinate,
                viewResolution, 'EPSG:3857', {'INFO_FORMAT': 'text/html'});
                    if (url != null) {
                        document.getElementById('get-feature-info').innerHTML = '<iframe seamless src="' + url + '"></iframe>';
                    }
                    else {
                        map.removeOverlay(infoPopup);
                    }
        }
    })
});
//Change pointer on feature
map.on('pointermove', function(e) {
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'auto' : '';
    if (e.dragging) {
        $(elementPopup).popover('destroy');
        return;
    };
    map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
        if (layer === points) {
            var pixel = map.getEventPixel(e.originalEvent);
            var hit = map.hasFeatureAtPixel(pixel);
            map.getTarget().style.cursor = hit ? 'pointer' : '';
        }
    });
});