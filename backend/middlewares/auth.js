module.exports = function (req, res, next) {
  if (req.cookies && req.cookies.admin === process.env.ADMIN_ID) {
    return next();
  }
  res.redirect('/admin/login');
};
