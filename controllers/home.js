/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home',
    google_map_api_key: process.env.GOOGLE_MAP_API_KEY
  });
};
