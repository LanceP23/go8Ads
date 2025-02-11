const { compare } = require('bcrypt');
const User = require('../../models/User');
const { hashPassword,comparePassword } = require('../../utils/bcrypt');
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const hashedPassword = await hashPassword(password);
        const user = new User({ username, password: hashedPassword });
        
        await user.save();
        res.status(201).json({ message: 'User created successfully',
            user:{id:user._id, username: user.username}
         });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,  
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

const logoutUser =(req,res)=>{
    
}

module.exports = { createUser, loginUser };
