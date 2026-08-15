import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

// Controller for creating a new resume
// POST: /api/resumes/create
export const createResume = async (req, res) => {

    try {

        const userId = req.userId;
        const { title } = req.body;

        const newResume = await Resume.create({
            userId,
            title
        });

        return res.status(201).json({
            message: "Resume created successfully",
            resume: newResume
        });

    } catch (error) {

        return res.status(400).json({
            message: error.message
        });

    }

};


// Controller for deleting a resume
// DELETE: /api/resumes/delete
export const deleteResume = async (req, res) => {

    try {

        const userId = req.userId;
        const { resumeId } = req.params;

        const resume = await Resume.findOneAndDelete({
            userId,
            _id: resumeId
        });

        if (!resume) {

            return res.status(404).json({
                message: "Resume not found"
            });

        }

        return res.status(200).json({
            message: "Resume deleted successfully"
        });

    } catch (error) {

        return res.status(400).json({
            message: error.message
        });

    }

};


// Get user resume by ID
// GET: /api/resumes/get
export const getResumeById = async (req, res) => {

    try {

        const userId = req.userId;
        const { resumeId } = req.params;

        const resume = await Resume.findOne({
            userId,
            _id: resumeId
        });

        if (!resume) {

            return res.status(404).json({
                message: "Resume not found"
            });

        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res.status(200).json({
            resume
        });

    } catch (error) {

        return res.status(400).json({
            message: error.message
        });

    }

};


// Get public resume by ID
// GET: /api/resumes/public
export const getPublicResumeById = async (req, res) => {

    try {

        const { resumeId } = req.params;

        const resume = await Resume.findOne({
            public: true,
            _id: resumeId
        });

        if (!resume) {

            return res.status(404).json({
                message: "Resume not found"
            });

        }

        return res.status(200).json({
            resume
        });

    } catch (error) {

        return res.status(400).json({
            message: error.message
        });

    }

};


// Controller for updating a resume
// PUT: /api/resumes/update
export const updateResume = async (req, res) => {

    try {

        const userId = req.userId;

        const {
            resumeId,
            resumeData,
            removeBackground
        } = req.body;

        const image = req.file;

        let resumeDataCopy;

        /*
         * Parse resumeData because multipart/form-data
         * sends it as a string.
         */

        if (typeof resumeData === "string") {

            resumeDataCopy = JSON.parse(resumeData);

        } else {

            resumeDataCopy = structuredClone(
                resumeData
            );

        }


        /*
         * Handle image upload.
         */

        if (image) {

            console.log("Image upload detected.");

            /*
             * Convert the incoming value into a real boolean.
             *
             * Frontend sends:
             * "true" or "false"
             */

            const shouldRemoveBackground =
                removeBackground === true ||
                removeBackground === "true" ||
                removeBackground === "yes" ||
                removeBackground === "1";


            console.log(
                "Remove background:",
                shouldRemoveBackground
            );


            /*
             * Create readable stream from uploaded file.
             */

            const imageBufferData =
                fs.createReadStream(image.path);


            /*
             * Base transformations.
             */

            let transformation =
                "w-300,h-300,fo-face,z-0.75";


            /*
             * ImageKit background removal.
             *
             * e-bgremove is ImageKit's own
             * background-removal transformation.
             */

            if (shouldRemoveBackground) {

                transformation += ",e-bgremove";

                console.log(
                    "ImageKit background removal ENABLED"
                );

            } else {

                console.log(
                    "ImageKit background removal DISABLED"
                );

            }


            console.log(
                "ImageKit transformation:",
                transformation
            );


            /*
             * Upload image to ImageKit.
             */

            const response =
                await imagekit.files.upload({

                    file: imageBufferData,

                    fileName:
                        `resume-${userId}-${Date.now()}.png`,

                    folder:
                        "user-resumes",

                    transformation: {
                        pre: transformation
                    }

                });


            /*
             * Make sure personal_info exists.
             */

            if (!resumeDataCopy.personal_info) {

                resumeDataCopy.personal_info = {};

            }


            /*
             * Store the ImageKit URL.
             */

            resumeDataCopy.personal_info.image =
                response.url;


            /*
             * Delete temporary uploaded file.
             */

            try {

                if (
                    image.path &&
                    fs.existsSync(image.path)
                ) {

                    fs.unlinkSync(image.path);

                }

            } catch (fileError) {

                console.log(
                    "Temporary file cleanup failed:",
                    fileError.message
                );

            }

        }


        /*
         * Update resume in MongoDB.
         */

        const resume =
            await Resume.findOneAndUpdate(

                {
                    userId,
                    _id: resumeId
                },

                resumeDataCopy,

                {
                    new: true,
                    runValidators: true
                }

            );


        if (!resume) {

            return res.status(404).json({
                message: "Resume not found"
            });

        }


        return res.status(200).json({

            message: "Saved successfully",

            resume

        });


    } catch (error) {

        console.error(
            "Resume update error:",
            error
        );

        return res.status(400).json({

            message:
                error.message ||
                "Failed to update resume"

        });

    }

};
