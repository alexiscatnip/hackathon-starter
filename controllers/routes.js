
/**
 * GET /map
 * Home page.
 */
exports.getRoute = (req, res) => {
  res.render('route/route', {
    title: 'Google Maps API'
  });

};



