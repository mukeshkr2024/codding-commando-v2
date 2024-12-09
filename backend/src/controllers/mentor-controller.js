const CatchAsyncError = require("../middleware/catchAsyncError");
const Mentor = require("../models/mentors.model");
const ErrorHandler = require("../utils/ErrorHandler");

const createMentor = CatchAsyncError(async (req, res, next) => {
  try {
    const name = req.body.name;

    if (!name) {
      throw new Error("Please provide a name");
    }

    // create the mentor
    const mentor = await Mentor.create({ name });

    return res.status(201).json({
      success: true,
      message: "Mentor created successfully",
      mentor,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getMentorsById = CatchAsyncError(async (req, res, next) => {
  try {
    const mentorId = req.params.mentorId;

    const mentor = await Mentor.findById({ _id: mentorId });

    return res.status(200).json({
      status: true,
      message: "Fetched sucessfully",
      mentor,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const updateMentor = CatchAsyncError(async (req, res, next) => {
  try {
    const mentorId = req.params.mentorId;
    const data = req.body;

    const mentor = await Mentor.findByIdAndUpdate(
      { _id: mentorId },
      { $set: data },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Updated successfully",
      mentor,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getAllMentors = CatchAsyncError(async (req, res, next) => {
  try {
    const mentors = await Mentor.find({
      role: "mentor",
      isPublished: true,
    })
      .sort({
        createdAt: -1,
      })
      .select("name");

    return res.status(200).json({
      success: true,
      message: "fetched successfully",
      mentors,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getAllMembers = CatchAsyncError(async (req, res, next) => {
  try {
    const mentors = await Mentor.find()
      .sort({
        createdAt: -1,
      })
      .select(
        "-assignCourses -courseAssigned -description -imageUrl -additionInfo"
      );

    return res.status(200).json({
      success: true,
      message: "fetched successfully",
      mentors,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const publishMentor = CatchAsyncError(async (req, res, next) => {
  try {
    const mentorId = req.params.mentorId;

    const mentor = await Mentor.findOneAndUpdate(
      {
        _id: mentorId,
      },
      { $set: { isPublished: true } },
      {
        new: true,
      }
    );

    res
      .status(200)
      .json({ success: true, message: "Mentor published", data: mentor });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const unpublishMentor = CatchAsyncError(async (req, res, next) => {
  try {
    const mentorId = req.params.mentorId;

    const mentor = await Mentor.findOneAndUpdate(
      {
        _id: mentorId,
      },
      { $set: { isPublished: false } },
      {
        new: true,
      }
    );

    res
      .status(200)
      .json({ success: true, message: "Mentor unpublished", data: mentor });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const deleteMentor = CatchAsyncError(async (req, res, next) => {
  try {
    const mentorId = req.params.mentorId;

    const deletedMentor = await Mentor.findOneAndDelete({
      _id: mentorId,
    });

    if (!deletedMentor) {
      return next(new ErrorHandler("Mentor not found", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "Mentor deleted", data: {} });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getAllMentorsByUser = CatchAsyncError(async (req, res, next) => {
  try {
    const mentors = await Mentor.find({
      isPublished: true,
      role: "mentor",
    }).select("name description imageUrl additionInfo");

    return res.status(200).json({
      success: true,
      mentors,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getTeamMembers = CatchAsyncError(async (req, res, next) => {
  try {
    const members = await Mentor.find({ isPublished: true }).select(
      "name description role imageUrl"
    );

    members.sort((a, b) => {
      // Assuming 'mentor' comes before other roles in your logic
      if (a.role === "mentor" && b.role !== "mentor") {
        return -1;
      } else if (a.role !== "mentor" && b.role === "mentor") {
        return 1;
      } else {
        return 0;
      }
    });

    res.status(200).json({
      success: true,
      message: "Team fetched",
      members,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message));
  }
});

module.exports = {
  createMentor,
  getMentorsById,
  updateMentor,
  getAllMentors,
  publishMentor,
  unpublishMentor,
  deleteMentor,
  getAllMentorsByUser,
  getTeamMembers,
  getAllMembers,
};
