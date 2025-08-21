// middleware/roleCheck.js

export const roleCheck = (roles = []) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ msg: "Access denied" });
      }
      next();
    } catch (err) {
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  };
};