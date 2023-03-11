import multer from "multer";

const directoryPath = `${process.cwd()}/server/api/uploads`;

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, directoryPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(/\s+/g, ""));
  },
});

const upload = multer({ storage: fileStorageEngine });

export default defineEventHandler(async (event) => {
  console.log(event);
  try {
    await callNodeListener(
      upload.single("track"),
      event.node.req,
      event.node.res
    );
    return { success: true };
  } catch (error) {
    return createError({
      message: error.message,
      statusCode: 422,
      statusMessage: "Unprocessable Entity",
    });
  }
});
