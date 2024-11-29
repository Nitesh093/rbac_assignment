const checkPermission = (requiredPermission) => {
    return (req, res, next) => {
      const userRole = req.user.role;
  
      if (!userRole || !userRole.permissions.includes(requiredPermission)) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }
  
      next();
    };
  };
  
  module.exports = { checkPermission };