import React, { useRef } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import "./styles.css";
import axios from "axios";
import "./styles.css";
/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar(props) {
  const uploadInputRef = useRef(null);
  const user = props.user;
  const handleUploadButtonClicked = (event) => {
    event.preventDefault();
    console.log(user._id);
    if (uploadInputRef.current && uploadInputRef.current.files.length > 0) {
      const formData = new FormData();
      formData.append("uploadedphoto", uploadInputRef.current.files[0]);
      axios
        .post(`http://localhost:8081/api/photo/new/${user._id}`, formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.error("POST ERR:", err));
    }
  };

  const handleLogoutButtonClicked = async () => {
    props.changeUser(null);
    props.changeStatus(false);
  };
  return (
    <AppBar className="cs142-topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          PhotoSharing
        </Typography>

        <Typography
          className="version"
          variant="body1"
          color="inherit"
        ></Typography>

        {props.userIsLoggedIn ? (
          <>
            <Typography className="login" variant="h5" color="inherit">
              {`Hello ${props.user.first_name}`}
            </Typography>
            <div className="logoutButton">
              <input type="file" accept="image/*" ref={uploadInputRef} />
              <Button variant="contained" onClick={handleUploadButtonClicked}>
                Add photo
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogoutButtonClicked}
              >
                Logout
              </Button>
            </div>
          </>
        ) : (
          <Typography className="login" variant="h5" color="inherit">
            Please Login
          </Typography>
        )}

        <Typography className="info" variant="h5" color="inherit">
          {/* {message} */}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
