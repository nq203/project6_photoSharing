const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();
const multer = require("multer");
const processFormBody = multer({ storage: multer.memoryStorage() }).single(
  "uploadedphoto"
);
const fs = require("fs");
router.post("/new/:userId", async (request, response) => {
  const userId = request.params.userId;
  console.log(userId + " new photo");
  processFormBody(request, response, function (err) {
    if (err || !request.file) {
      response.status(400).send(JSON.stringify(err));
      return;
    }
    var timestamp = new Date().valueOf();
    var filename = "U" + String(timestamp) + request.file.originalname;
    console.log(filename);
    fs.writeFile("./images/" + filename, request.file.buffer, function (err) {
      if (err) {
        response.status(400).send(JSON.stringify(err));
        console.log("loii1");
      } else {
        Photo.create({
          file_name: filename,
          date_time: timestamp,
          user_id: userId,
          comments: [],
        });
      }
    });
  });
});

router.get("/:id", async (req, res) => {
  var id = req.params.id;
  // console.log(id);
  Photo.find({ user_id: id })
    .then((photo) => {
      if (!photo) {
        console.log("User with _id:" + id + " not found.");
        return res.status(400).send("Not found");
      }

      return res.status(200).send(photo);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Internal server error"); // Handle errors appropriately
    });
});
router.get("/", async (req, res) => {
  console.log("lay data : " + req.session.login_name);
  try {
    const photo = await Photo.find({});
    if (photo) {
      res.status(200).json(photo); // Send users data with appropriate status code
    } else {
      res.status(404).send("No users found"); // Send clear message if no users found
    }
  } catch (error) {
    // Handle errors gracefully
    console.error(error); // Log the error for debugging
    res.status(500).send("Error retrieving users"); // Send generic error message
  }
});
module.exports = router;
