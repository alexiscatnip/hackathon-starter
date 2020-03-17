/**
 * GET /
 * Home page.
 */
//Get map page
// exports.getMap = (req, res) => {
//   res.render('map', {
//     title: 'map here!'
//   });
// };

exports.getMap = (req, res) => {
  res.render('map/google-maps', {
    title: 'Google Maps API',
    google_map_api_key: process.env.GOOGLE_MAP_API_KEY
  });
};