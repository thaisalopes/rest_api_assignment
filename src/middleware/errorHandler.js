//Error handling middleware
// Preserves existing HTTP error status codes (if already set and not 200)
// and defaults to 500 for unexpected server errors, returning consistent JSON responses
module.exports = (err, _req, res, _next) => {
  console.error(err);
  res
    .status(res.statusCode && res.statusCode !== 200 ? res.statusCode : 500)
    .json({ success: false, error: err.message || 'Server error' });
};
