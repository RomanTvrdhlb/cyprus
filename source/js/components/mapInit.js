
 
var _GOOGLE_MAP_STROKE_COLOR = '#CB454D';
var _GOOGLE_MAP_STROKE_WEIGHT = 5;

var _GOOGLE_MAP_STYLES = [
	{
		featureType:"administrative",
		elementType:"labels.text.fill",
		stylers:[{
			color:"#737373"
		}]
	},
	{
		featureType:"administrative",
		elementType:"geometry.stroke",
		stylers:[{
			color:"#9f9f9f"
		}]
	},
	{
		featureType:"administrative.locality",
		elementType:"labels.icon",
		stylers:[{
			color:"#6b6b6b"
		}]
	},
	{
		featureType:"landscape",
		elementType:"all",
		stylers:[{
			color:"#f5f5f3"
		}]
	},
	{
		featureType:"poi",
		elementType:"all",
		stylers:[{
			visibility:"off"
		}]
	},
	{
		featureType:"road",
		elementType:"all",
		stylers:[
			{saturation:-100},
			{lightness:45}
		]
	},
	{
		featureType:"road.highway",
		elementType:"all",
		stylers:[{
			visibility:"simplified"
		}]
	},
	{
		featureType:"road.arterial",
		elementType:"labels.icon",
		stylers:[{
			visibility:"off"
		}]
	},
	{
		featureType:"transit",
		elementType:"all",
		stylers:[{
			visibility:"off"
		}]
	},
	{
		featureType:"water",
		elementType:"all",
		stylers:[
			{color:"#cad2d3"},
			{visibility:"on"}
		]
	}
];


var data = {
	mapCanvas: document.getElementById('map'),
	directionsService: new google.maps.DirectionsService(),
	directionsDisplay: new google.maps.DirectionsRenderer({polylineOptions: {strokeColor: _GOOGLE_MAP_STROKE_COLOR, strokeWeight: _GOOGLE_MAP_STROKE_WEIGHT}}),
};

	
function initialize(data) {
	var styledMap = new google.maps.StyledMapType(_GOOGLE_MAP_STYLES, {name: "Styled Map"});
	var mapOptions = {
		center: new google.maps.LatLng(10.093561428492958, -30.424399156441126),
		zoom: 3,
		mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style'],
		fullscreenControl:false,
		streetViewControl:false,
		mapTypeControl:false,
		zoomControl:true,
		zoomControlOptions: {
			position: google.maps.ControlPosition.TOP_RIGHT
		},
		scaleControl: false,
		draggable: true,
		scrollwheel:false
	};
	var map = new google.maps.Map(data.mapCanvas, mapOptions);
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');
	var acOptions = {
		types: ['(cities)']
	};
	data.directionsDisplay.setMap(map);
	//data.autocomplete.start = new google.maps.places.Autocomplete(data.cities.start/*,acOptions*/);
	//data.autocomplete.end = new google.maps.places.Autocomplete(data.cities.end/*,acOptions*/);
}
initialize(data);