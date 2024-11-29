const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');

const register = async (req, res) => {
  try {
    const { username, email, password, roleName } = req.body;

    
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

   
    let role = await Role.findOne({ name: roleName || 'user' });
    if (!role) {
      role = new Role({ 
        name: roleName || 'user',
        permissions: ['read:own']
      });
      await role.save();
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role._id
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).populate('role');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role.name },
      secret,
      { expiresIn }
    );

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        role: user.role.name 
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

module.exports = { register, login };