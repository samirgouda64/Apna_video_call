import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import "../styles/history.css";

import { IconButton } from "@mui/material";

import { Dialog, DialogTitle, DialogContent } from "@mui/material";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);

  const [meetings, setMeetings] = useState([]);

  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch {
        // IMPLEMENT SNACKBAR
      }
    };

    fetchHistory();
  }, []);

  let formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="historyPage">
      {/* HEADER */}
      <div className="historyHeader">
        <div className="left">
          <IconButton onClick={() => routeTo("/home")}>
            <HomeIcon />
          </IconButton>
          <h2>Meeting History</h2>
        </div>
      </div>

      {/* LIST */}
      <div className="historyList">
        {meetings.length !== 0 ? (
          meetings.map((e, i) => (
            <div key={i} className="historyRow">
              <div className="rowLeft">
                <div className="meetingIcon">🎥</div>

                <div>
                  <p className="meetingCode">{e.meetingCode}</p>
                  <p className="meetingDate">{formatDate(e.date)}</p>
                </div>
              </div>

              <div className="rowRight">
                <Button
                  className="detailsBtn"
                  onClick={() => setSelectedMeeting(e)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="emptyState">
            <h3>No Meetings Yet 😔</h3>
            <p>Your meeting history will appear here</p>
          </div>
        )}
      </div>

      {/* MODAL */}
      <Dialog
        open={!!selectedMeeting}
        onClose={() => setSelectedMeeting(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Meeting Details</DialogTitle>

        <DialogContent>
          {selectedMeeting && (
            <div className="detailsBox">
              <p>
                <strong>Meeting Code:</strong> {selectedMeeting.meetingCode}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(selectedMeeting.date)}
              </p>

              {/* Optional fields */}
              {selectedMeeting.duration && (
                <p>
                  <strong>Duration:</strong> {selectedMeeting.duration}
                </p>
              )}

              {selectedMeeting.participants && (
                <p>
                  <strong>Participants:</strong> {selectedMeeting.participants}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
