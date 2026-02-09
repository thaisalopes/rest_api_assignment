const ok = (res, data, status = 200) =>
  res.status(status).json({ success: true, data });
const fail = (res, status, message) =>
  res.status(status).json({ success: false, error: message });

module.exports = {
  ok,
  fail,
};
