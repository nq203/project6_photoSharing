import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import CommentDialog from "../CustomComment";
function UserPhotos(props) {
  const user = props.user;
  console.log("user photo:" + user);
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]); // State to store the photo list

  useEffect(() => {
    const fetchUserPhotos = async () => {
      try {
        const data = await fetchModel(`photo/${userId}`);
        setPhotos(data); // Assuming data is an array of photos
      } catch (error) {
        console.error("Error fetching user photos:", error);
      }
    };

    fetchUserPhotos();
  }, [userId]);

  if (photos.length === 0) {
    return <div>No photos found for this user.</div>;
  }

  return (
    <div>
      <Typography variant="body1">User Photos for User ID: {userId}</Typography>
      {photos.map((photo) => (
        <div key={photo._id}>
          <img
            src={require("../../../../backend/images/" + photo.file_name)}
            height={200}
            width={200}
          />
          <Typography variant="body2">Time: {photo.date_time}</Typography>
          <Typography variant="h6">Comments</Typography>

          {photo.comments.map((comment) => (
            <div key={comment._id}>
              <Typography variant="body2">
                Comment: {comment.comment}
              </Typography>
              <Typography variant="body2">Time: {comment.date_time}</Typography>
            </div>
          ))}
          <CommentDialog photo_id={photo._id} user={user} />
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;
