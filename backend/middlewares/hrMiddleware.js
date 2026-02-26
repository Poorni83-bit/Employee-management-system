module.exports = (req, res, next) => {
  if (req.user.role !== "hr")
    return res.status(403).json({ message: "HR only access" });
  next();
};
