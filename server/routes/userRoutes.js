const express = require('express');
const {
    createUser,
    loginUser,
    logoutUser,
    handleRefreshToken,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    blockUser,
    unblockUser,
    updatePassword
} = require('../controllers/userController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);

router.get("/logout", logoutUser);
router.get("/refresh", handleRefreshToken);
router.get("/all-users", authMiddleware, isAdmin, getAllUsers);
router.get("/:id", authMiddleware, getUser);

router.delete("/:id", deleteUser);

router.put("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.put("/update-password", authMiddleware, updatePassword);

module.exports = router;