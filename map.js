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
})
//Define Stamen Watercolor
var stamenWatercolor = new ol.layer.Tile({
    title: 'Stamen Watercolor',
    type: 'base',
    visible: false,
    source: new ol.source.Stamen({
        layer: 'watercolor'
    })
});
//Add the basemaps and the Layerswitcher
var map = new ol.Map ({
	target: document.getElementById('map'),
	layers: [
	    new ol.layer.Group({
	        title: 'Basemaps',
	        layers: [stamenWatercolor, gmaps, osm]
	    })
	],
	view: new ol.View({
	    center: ol.proj.fromLonLat([9.116372, 45.469449]),
	    zoom: 13,
	}),
	controls: ol.control.defaults().extend([
	    new ol.control.ScaleLine(),
	    new ol.control.OverviewMap(),
	    new ol.control.FullScreen(),
	    new ol.control.MousePosition({
	        coordinateFormat: ol.coordinate.createStringXY(4),
	        projection: 'EPSG: 4326'
	    })
	 ])
});
//Define the Layerswitcher
var layerSwitcher = new ol.control.LayerSwitcher({});
map.addControl(layerSwitcher);

//POPUP DEFINITION
var elementPopup = document.getElementById('popup');

var popup = new ol.Overlay({
	element: elementPopup
});
map.addOverlay(popup);

map.on('click', function(event) {
    var feature = map.forEachFeatureAtPixel(event.pixel, function(feature, layer) {
    return feature;
    });
    if (feature != null) {
    var pixel = event.pixel;
    var coord = map.getCoordinateFromPixel(pixel);
    popup.setPosition(coord);
    $(elementPopup).attr('title', 'Ecuador railways');
    $(elementPopup).attr('data-content', '<b>Id: </b>' + feature.get('FID_rail_d') +
    '</br><b>Description: </b>' + feature.get('F_CODE_DES'));
    $(elementPopup).popover({'placement': 'top', 'html': true});
    $(elementPopup).popover('show');
    }
});
map.on('pointermove', function(e) {
    if (e.dragging) {
    $(elementPopup).popover('destroy');
    return;
    }
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});
