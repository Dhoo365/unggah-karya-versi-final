export const notFound = (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} tidak ditemukan` });
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
};
