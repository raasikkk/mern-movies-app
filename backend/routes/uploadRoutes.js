import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png||image\/webp/;

  const extname = path.extname(file.originalname);
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadFields = upload.fields([
  { name: "imageVertical", maxCount: 1 },
  { name: "imageHorizontal", maxCount: 1 },
]);

router.post("/", (req, res) => {
  uploadFields(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.files) {
      const imageVertical = req.files.imageVertical
        ? `/${req.files.imageVertical[0].path}`
        : null;
      const imageHorizontal = req.files.imageHorizontal
        ? `/${req.files.imageHorizontal[0].path}`
        : null;

      res.status(200).send({
        message: "Images uploaded successfully",
        imageVertical,
        imageHorizontal,
      });
    } else {
      res.status(400).send({ message: "No image files provided" });
    }
  });
});

export default router;
