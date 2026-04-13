import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';
import Loader from '../components/Loader/Loader';

function HomeComponent() {


    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const [loading, setloading] = useState(false);
    const [loadingText, setLoadingText] = useState("");


    const {addToUserHistory} = useContext(AuthContext);
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    const handleHistory = () => {
        setLoadingText("Opening History...");
        setloading(true);
        setTimeout(() => {
            navigate("/history");
            setloading(false);
        }, 1000);
    };

   return (
  <>
  {loading && <Loader fullScreen text={loadingText} />}
    <div className="navBar">
      <div className="logoSection">
        <h2>Apna Video Call</h2>
      </div>

      <div className="navActions">
        <div className="history" onClick={handleHistory}>
          <span>History</span>
        </div>

        <Button
          className="logoutBtn"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/auth");
          }}
        >
          Logout
        </Button>
      </div>
    </div>

    <div className="meetContainer">
      {/* LEFT */}
      <div className="leftPanel">
        <h1>
          High Quality <span>Video Meetings</span> Made Simple
        </h1>

        <p>
          Connect with your team, friends, and classmates with secure and
          crystal-clear video calls.
        </p>

        <div className="joinBox">
          <TextField
            onChange={(e) => setMeetingCode(e.target.value)}
            label="Enter Meeting Code"
            variant="outlined"
            className="meetingInput"
          />

          <Button
            onClick={handleJoinVideoCall}
            variant="contained"
            className="joinBtn"
          >
            Join Now
          </Button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="rightPanel">
        <img src="/logo3.png" alt="video call" />
      </div>
    </div>
  </>
);
}


export default withAuth(HomeComponent)