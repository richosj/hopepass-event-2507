module.exports = function (req, res, next) {
  const admin = req.cookies?.admin;
  const expected = process.env.ADMIN_ID?.trim();

  if (admin && expected && admin === expected) {
    return next();
  }

  console.warn('인증 실패:', { admin, expected });
  res.clearCookie('admin');

  const wantsJSON = req.headers.accept?.includes('application/json');

  if (wantsJSON) {
    return res.status(401).json({ message: '인증 필요' });
  } else {
    return res.redirect('/admin/login');
  }
};
