var map; //creates a variable map
// Create a new blank array for all the listing markers.
var markers = [];


  
//lat-lng for 5 default Locations
var locations = [
  {title: 'Eiffel Tower',location:{lat:48.858093, lng: 2.294694}},
          
  {title: 'The Lourve', location:{lat:48.860294, lng:2.338629}},
          
  {title: 'Notre-Dame de Paris', location:{lat:48.852966, lng: 2.349902}},
          
  {title: 'Arc de Triomphe', location:{lat:48.873756, lng: 2.294946}},
          
  {title: 'Tuileries Garden', location:{lat:48.865302, lng: 2.327284}}
          
  ];
// making variables as knockout observables
var Locations = function(data) {
    this.title = ko.observable(data.title);
    this.visiable = ko.observable(true);
    this.location = ko.observable(data.location);
    this.marker = data.marker;

};
//Declaring the view model
var ViewModel= function() {
    var self = this;
    this.myLocations = ko.observableArray( [] );
    locations.forEach( function( locationItem ) {
        self.myLocations.push( new Location( locationItem ) );
    } );
    this.currentlocation = ko.observable( this.myLocations()[ 0 ] );
    this.markers = ko.observableArray( locations );
    this.filter = ko.observable( "" );
    this.wikipedia = ko.observableArray( [] );
    url = ko.observable( this.currentlocation );
    details = ko.observable( url );
  //remove all the current locations, which removes them from the view
    this.search = function(value){
        if( value ){
        //filtering the markers with the marker setVisible method
            for ( var x in locations){
                if (locations[x].title.toLowerCase()
                    .indexOf(value.toLowerCase() ) >=0 ){
                    self.myLocations()[ x ].visible(true);
                    self.myLocations()[ x ].marker.setVisible( true );
                }else {
                    self.myLocations()[ x ].visible( false );
                    self.myLocations()[ x ].marker.setVisible( false );
                }
            }

        } else {
            for ( var y in locations ){
                if( locations[ y ].title.toLowerCase()
                .indexOf( value.toLowerCase()) >=0 )
                self.myLocations()[ y ].visible( true );
                self.myLocations()[ y ].marker.setVisible( true );
            }
        }

    };

    this.initMap=function() {
  //constructor creates a new map
        map = new google.maps.Map(document.getElementById('map'), {
            center: { 
                lat: 48.864716, lng: 2.349014 
            },
            zoom: 13

        } );
  // Style the markers a bit. This will be our listing marker icon.
        // var defaultIcon = makeMarkerIcon('0091ff');
        // // Create a "highlighted location" marker color for when the user
        // // mouses over the marker.
        // var highlightedIcon = makeMarkerIcon('FFFF24');

        // var largeInfowindow = new google.maps.InfoWindow();
        // var bounds = new google.maps.LatLngBounds();

	// The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
            var position = locations[i].location;
            var title = locations[i].title;
          // Create a marker per location, and put into markers array.
            var marker = new google.maps.Marker({
                position: position,
                title: title,
                icon: defaultIcon,
                animation: google.maps.Animation.DROP,
            // icon: defaultIcon,
                id: i,
                map:map
            } );
        
    
          // Push the marker to our array of markers.
            markers.push(marker);
         // Create an onclick event to open the large infowindow at each marker.
            // bounds.extend(marker.position);
            // marker.addListener('click', function() {
            //     populateInfoWindow(this, largeInfowindow);
            // });
            // marker.addListener('mouseover', function() {
            //     this.setIcon(highlightedIcon);
            // });
    
            // marker.addListener('mouseout', function() {
            //     this.setIcon(defaultIcon);
            // });
            // map.fitBounds(bounds);
    // Push the marker to our array of markers. 
            self.myLocations()[ i ].marker = marker;
        }
    };
  
    // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
    this.populateInfoWindow = function() {
        var marker = this;
        loadData( marker.title );
        // Check to make sure the infowindow is not already opened on this marker.
        if ( infowindow.marker != marker ) {
            infowindow.marker = marker;
            infowindow.setContent( '<div>' + marker.title + '</div>' );
            marker.setAnimation( google.maps.Animation.BOUNCE ); // Bounce marker when list view item is clicked
            //infowindow.open(map, place.marker); // Open info window on correct marker when list item is clicked
            setTimeout( function() {
                marker.setAnimation( null ); // End animation on marker after 2 seconds
            }, 2000 );
            infowindow.open( map, marker );
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener( 'closeclick', function() {
                infowindow.marker = null;
            } );
        }
    };
    //Click on item in list view
    
    this.listViewClick = function( place ) {
        google.maps.event.trigger( place.marker, 'click' );
    };
    /*This function takes in a COLOR, and then creates a new marker
      icon of that color. The icon will be 21 px wide by 34 high, have an origin
      of 0, 0 and be anchored at 10, 34)*/
    this.makeMarkerIcon = function(markerColor) {
        var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21,34));
        return markerImage;
  
        this.initMap();
    }  


};


// calling the error function
window.mapError = function( errorMsg, url, lineNumber ) {
    alert( 'Google Maps Failed To Load' );
};



 
       /*This function takes in a COLOR, and then creates a new marker
      icon of that color. The icon will be 21 px wide by 34 high, have an origin
      of 0, 0 and be anchored at 10, 34)*/
// function makeMarkerIcon(markerColor) {
//   var markerImage = new google.maps.MarkerImage(
//     'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
//       '|40|_|%E2%80%A2',
//     new google.maps.Size(21, 34),
//     new google.maps.Point(0, 0),
//     new google.maps.Point(10, 34),
//     new google.maps.Size(21,34));
//     return markerImage;
  
//     this.initMap();
// }  
//loading data from wiki api
var loadData = function( name ) {

    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + name + '&format=json&callback=wikiCallback';

    $.ajax( {
        url: wikiUrl,
        dataType: "jsonp", // jsonp: "callback",
        success: function( response ) {
            viewModel.wikipedia( [] );
            console.log( response );
            var articleList = response[ 1 ];
            for ( var i = 0; i < articleList.length; i++ ) {
                articleStr = articleList[ i ];
                var url = 'https://en.wikipedia.org/wiki/' + articleStr;

                viewModel.wikipedia.push( url );
            }
        }
    }).fail(function (jqXHR, textStatus) {
        alert( "failed to get wikipedia resources" );
    });
};

           $("#menu-toggle").click(function(e) {
               e.preventDefault();
               $("#wrapper").toggleClass("toggled");           
           });

var viewModel = new ViewModel();
viewModel.filter.subscribe( viewModel.search );
ko.applyBindings( viewModel );
