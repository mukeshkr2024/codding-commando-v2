const CatchAsyncError = require("../middleware/catchAsyncError");
const Chapter = require("../models/chapter.model");
const Course = require("../models/course.model");
const Mentor = require("../models/mentors.model");
const Module = require("../models/module.model");
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");
const { UploadVideo, DeleteVideo } = require("../utils/video-upload");

const createChapter = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const moduleId = req.params.moduleId;

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    const module = await Module.findById(moduleId);
    if (!module) {
      return next(new ErrorHandler("Module not found", 404));
    }

    // Fetching the last chapter to determine the new position
    const lastChapter = await Chapter.find({
      module: moduleId,
      course: courseId,
    });

    const newPosition =
      lastChapter.length > 0 ? lastChapter[0].position + 1 : 1;

    const chapter = await Chapter.create({
      course: courseId,
      title: req.body.title,
      module: moduleId,
      position: newPosition,
    });

    module.chapters.push(chapter._id);
    await module.save();

    res.status(201).json({
      success: true,
      message: "Chapter created successfully",
      chapter,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getAllChapters = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const moduleId = req.params.moduleId;

    const course = await Course.findById(courseId);
    if (!course) {
      throw next(new ErrorHandler("Course not found", 404));
    }

    const module = await Module.findById(moduleId).populate("chapters");
    if (!module) {
      throw next(new ErrorHandler("Module not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Chapter created successfully",
      module,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getChapterById = CatchAsyncError(async (req, res, next) => {
  try {
    const chapterId = req.params.chapterId;

    const chapter = await Chapter.findById(chapterId)
      .populate({
        path: "mentors",
        select: "name",
      })
      .populate({
        path: "quiz_questions",
        select: "title isPublished",
      })
      .populate({
        path: "keyObjectives",
      })
      .select("-UsersProgress");

    if (!chapter) {
      throw next(new ErrorHandler("Chapter not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Chapter fetched successfully",
      chapter,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const updateChapter = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const moduleId = req.params.moduleId;
    const chapterId = req.params.chapterId;

    const course = await Course.findById(courseId);
    if (!course) {
      throw next(new ErrorHandler("Course Not found", 404));
    }

    const chapter = await Chapter.findOneAndUpdate(
      {
        _id: chapterId,
        course: courseId,
        module: moduleId,
      },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (!chapter) {
      throw next(new ErrorHandler("Module Not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Chapter updated successfully",
      chapter,
    });
  } catch (error) {
    return next(new ErrorHandler(error?.message, 400));
  }
});

const uploadChapterVideo = CatchAsyncError(async (req, res, next) => {
  try {
    const { courseId, moduleId, chapterId } = req.params;
    const { videoDuration } = req.body;

    const chapter = await Chapter.findOne({
      _id: chapterId,
      course: courseId,
      module: moduleId,
    });
    const file = req.file;

    if (!file) {
      throw new ErrorHandler("No file provided", 400);
    }

    let videoPath = chapter?.videoUrl;
    3;
    if (chapter && chapter.videoUrl) {
      const currentVideo = chapter.videoUrl.split("/");
      const currentVideoFileName = currentVideo[currentVideo.length - 1];
      await DeleteVideo(currentVideoFileName, {
        video: true,
      });
    }

    videoPath = await UploadVideo(file, {
      video: true,
    });

    const updatedChapter = await Chapter.findByIdAndUpdate(
      chapterId,
      { videoUrl: videoPath, videoDuration: videoDuration },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      updatedChapter,
    });
  } catch (error) {
    return next(new ErrorHandler(error?.message, 400));
  }
});

const deletChapterById = CatchAsyncError(async (req, res, next) => {
  try {
    const { courseId, moduleId, chapterId } = req.params;

    const module = await Module.findById(moduleId);

    // remove the chapter id from modules
    module.chapters.pull(chapterId);
    module.save();

    // delete the video from AWS also
    const chapter = await Chapter.findByIdAndDelete(chapterId);

    return res.status(200).json({
      success: true,
      message: "Chapter deleted",
    });
  } catch (error) {
    return next(new ErrorHandler(error?.message, 400));
  }
});

const assignMentor = CatchAsyncError(async (req, res, next) => {
  const { courseId, moduleId, chapterId } = req.params;
  const { mentorId } = req.body;

  try {
    const chapter = await Chapter.findOne({
      module: moduleId,
      course: courseId,
      _id: chapterId,
    });

    if (!chapter) {
      return next(new ErrorHandler("Chapter not found", 404));
    }

    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return next(new ErrorHandler("Mentor not found", 404));
    }

    if (chapter.mentors.includes(mentor._id)) {
      return next(new ErrorHandler("Mentor is already assigned", 400));
    }

    chapter.mentors.push(mentor._id);

    await chapter.save();

    res.status(200).json({
      success: true,
      message: "Mentor assigned successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const unassignMentor = CatchAsyncError(async (req, res, next) => {
  const { courseId, moduleId, chapterId } = req.params;
  const { mentorId } = req.body;

  try {
    const chapter = await Chapter.findOne({
      module: moduleId,
      course: courseId,
      _id: chapterId,
    });

    if (!chapter) {
      return next(new ErrorHandler("Chapter not found", 404));
    }

    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return next(new ErrorHandler("Mentor not found", 404));
    }

    if (!chapter.mentors.includes(mentor._id)) {
      return next(
        new ErrorHandler("Mentor is not assigned to this chapter", 400)
      );
    }

    chapter.mentors = chapter.mentors.filter((id) => !id.equals(mentor._id));

    await chapter.save();

    res.status(200).json({
      success: true,
      message: "Mentor unassigned successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const sendNotifications = async (req, res, next) => {
  try {
    const { courseId, moduleId, chapterId } = req.params;
    const { date, time } = req.body;

    const course = await Course.findById(courseId).populate(
      "enrollments.student"
    );

    if (!course) {
      throw new Error("Course not found");
    }

    const module = await Module.findById(moduleId);

    if (!module) {
      throw new Error("Module not found");
    }

    const chapter = await Chapter.findByIdAndUpdate(chapterId, {
      live_date: date,
      live_time: time,
    }).populate("mentors");

    if (!chapter) {
      throw new Error("Chapter not found");
    }

    if (chapter.isPublished && chapter.isLive) {
      for (const enrollment of course.enrollments) {
        const student = enrollment.student;

        const mentorNames = chapter.mentors.map((mentor) => mentor?.name);

        const template = "live-class.ejs";
        const mailData = {
          student_name: `${student.firstName} ${student.lastName}`,
          module: module?.title,
          topic: chapter?.title,
          mentor: mentorNames.join(", "),
          date: date,
          time: time,
          liveclassLink: chapter?.liveUrl,
        };

        try {
          const response = await sendMail({
            email: student?.email,
            subject: "Live Classes Scheduled",
            template,
            data: mailData,
          });
        } catch (error) {
          throw new Error(error?.message, 500);
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: "Notifications sent",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const sendReminderNotification = async (req, res, next) => {
  try {
    const { courseId, moduleId, chapterId } = req.params;

    const course = await Course.findById(courseId).populate(
      "enrollments.student"
    );

    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    const chapter = await Chapter.findOne({
      _id: chapterId,
      course: courseId,
      module: moduleId,
    }).populate("module mentors");

    if (!chapter) {
      return next(new ErrorHandler("Chapter not found", 404));
    }

    let studentsReminded = 0;

    if (chapter.isLive && chapter.live_date && chapter.live_time) {
      for (const enrollment of course.enrollments) {
        const student = enrollment.student;
        studentsReminded++;

        const mentorNames = chapter.mentors
          .map((mentor) => mentor?.name)
          .join(", ");
        const mailData = {
          student_name: `${student.firstName} ${student.lastName}`,
          module: chapter.module?.title,
          topic: chapter.title,
          mentor: mentorNames,
          date: chapter.live_date,
          time: chapter.live_time,
          liveclassLink: chapter.liveUrl,
        };

        try {
          await sendMail({
            email: student.email,
            subject: "Reminder: Upcoming Live Class",
            template: "live-class-reminder.ejs",
            data: mailData,
          });
        } catch (error) {
          console.error(
            `Failed to send reminder email to ${student.email}: ${error.message}`
          );
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: "Reminder notifications sent",
      students: studentsReminded,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getChapterAllQuizzes = CatchAsyncError(async (req, res, next) => {
  try {
    const { courseId, moduleId, chapterId } = req.params;
    console.log(courseId, moduleId, chapterId);

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    const module = await Module.findById(moduleId);
    if (!module) {
      return next(new ErrorHandler("Module not found", 404));
    }
    const lesson = await Chapter.findOne({
      course: courseId,
      _id: chapterId,
    })
      .populate({
        path: "quiz_questions",
        match: { isPublished: true },
        select: "title options",
        populate: {
          path: "options",
          select: "text",
        },
      })
      .select("quiz_questions title");

    if (!lesson) {
      return next(new ErrorHandler("Chapter not found", 404));
    }

    return res.status(200).json({ lesson: lesson });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const addKeyObjectives = CatchAsyncError(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const moduleId = req.params.moduleId;

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    const module = await Module.findById(moduleId);
    if (!module) {
      return next(new ErrorHandler("Module not found", 404));
    }

    // Fetching the last chapter to determine the new position
    const lastKeyObjective = await KeyObjectives.find({
      module: moduleId,
      course: courseId,
    });

    const newPosition =
      lastKeyObjective.length > 0 ? lastKeyObjective[0].position + 1 : 1;

    const objectives = await KeyObjectives.create({
      course: courseId,
      title: req.body.title,
      module: moduleId,
      position: newPosition,
    });

    module.chapters.objectives.push(lastKeyObjective);
    await objectives.save();

    res.status(201).json({
      success: true,
      message: "Chapter created successfully",
      objectives,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  createChapter,
  getAllChapters,
  getChapterById,
  updateChapter,
  uploadChapterVideo,
  deletChapterById,
  unassignMentor,
  assignMentor,
  sendNotifications,
  sendReminderNotification,
  getChapterAllQuizzes,
  addKeyObjectives,
};
