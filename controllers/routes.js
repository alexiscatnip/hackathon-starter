const Client = require("@googlemaps/google-maps-services-js").Client;

exports.getRoute = async (req, res, next) => {
  const client = new Client({});

  client
    .elevation({
      params: {
        locations: [{ lat: 45, lng: -110 }],
        key: process.env.GOOGLE_MAPS_API_KEY
      },
      timeout: 1000 // milliseconds
    })
    .then(r => {
      console.log(r.data.results[0].elevation);
    })
    .catch(e => {
      console.log(e);
  });
  
/**
 * GET /map
 * Home page.
 */

exports.getRoute = (req, res) => {
  res.render('map/google-maps', {
    title: 'Google Maps API',
    google_map_api_key: process.env.GOOGLE_MAP_API_KEY
  });

};











/**
 * Use this class to ensure Google Maps API javascript is loaded before running any google map specific code.
 */
class GoogleMapsApi {
  /**
   * Constructor set up config.
   */
  constructor() {
    // api key for google maps
    this.apiKey = 'your api key here';

    // set a globally scoped callback if it doesn't already exist
    if (!window._GoogleMapsApi) {
      this.callbackName = '_GoogleMapsApi.mapLoaded';
      window._GoogleMapsApi = this;
      window._GoogleMapsApi.mapLoaded = this.mapLoaded.bind(this);
    }
  }

  /**
   * Load the Google Maps API javascript
   */
  load() {
    if (!this.promise) {
      this.promise = new Promise(resolve => {
        this.resolve = resolve;
        if (typeof window.google === 'undefined') {
          const script = document.createElement('script');
          script.src = `//maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=${this.callbackName}`;
          script.async = true;
          document.body.append(script);
        } else {
          this.resolve();
        }
      });
    }

    return this.promise;
  }

  /**
   * Globally scoped callback for the map loaded
   */
  mapLoaded() {
    if (this.resolve) {
      this.resolve();
    }
  }
}