const express = require("express");
const router = express.Router();
const Photo = require("../db/photoModel");

router.post("/:photoId", async (request, response) => {
  const photoId = request.params.photoId;
  const user = request.body.user;
  const comment = request.body.comment;
  console.log(user);
  // Photo.findOne({ _id: photoId }).then((photo) => {
  //   if (photo) {
  //     let newComment = {
  //       comment: comment,
  //       date_time: Date.now(),
  //       user_id: user._id,
  //     };

  //     if (photo.comments.length) {
  //       photo.comments = photo.comments.concat([newComment]);
  //     } else {
  //       photo.comments = [newComment];
  //     }
  //     photo.save();
  //     response.status(200).send("Comments Updated");
  //   } else {
  //     response.status(400).send("Photo not found");
  //   }
  // });
});

router.get("/:id", async (req, res) => {
  var id = req.params.id;
  // console.log(id);
  Photo.findOne({ _id: id })
    .then((photo) => {
      if (!photo) {
        console.log("User with _id:" + id + " not found.");
        return res.status(400).send("Not found");
      }

      return res.status(200).send(photo.comments);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Internal server error"); // Handle errors appropriately
    });
});
module.exports = router;
