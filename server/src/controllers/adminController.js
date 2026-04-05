import adminService from "../services/adminService.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getAllUsers Controller:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await adminService.deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in deleteUser Controller:", error);
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllUsers,
  deleteUser,
};
