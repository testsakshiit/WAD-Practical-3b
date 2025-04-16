import express from "express";
import User from "../model/usermodels.js";

const router = express.Router();

// ✅ Remove or comment out this invalid line
// router.get("/getAllusers", fetch); 

// Create a new user
router.post("/create", async (req, res) => {
  try {
    const { name, email, address } = req.body;

    const newUser = new User({ name, email, address });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// Get all users
router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users." });
  }
});
// Update user by ID
router.put("/update/:id", async (req, res) => {
  try {
    const { name, email, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, address },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user." });
  }
});


// Delete user by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "User deleted successfully.", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user." });
  }
});


export default router;
