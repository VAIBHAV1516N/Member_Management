const Member = require("../models/Member");

exports.addMember = async (req, res) => {
  try {
    const { name, companyName, mobile, city, membershipType } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const member = await Member.create({
      name,
      companyName,
      mobile,
      city,
      membershipType: membershipType || "Basic",
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Member added successfully",
      data: member,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMember = async (req, res) => {
  try {
    const member = await Member.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const { name, companyName, mobile, city, membershipType } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const member = await Member.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      { name, companyName, mobile, city, membershipType },
      { new: true },
    );

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json({
      success: true,
      message: "Member updated successfully",
      data: member,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
