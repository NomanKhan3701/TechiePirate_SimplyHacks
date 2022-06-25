import React, { useState, useEffect } from "react";
import { FileUpload } from "../../components/import";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FcClock } from "react-icons/fc";
import { IoIosNotifications } from "react-icons/io";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import TextField from "@mui/material/TextField";
import "./CreateEvent.scss";

const CreateEvent = () => {
  const [files, setFiles] = useState([]);
  const [prevImg, setPrevImg] = useState();
  const [selectedDay, setSelectedDay] = useState(null);
  const [calendarToggle, setCalendarToggle] = useState(false);
  const [timeToggle, setTimeToggle] = useState(false);
  const [time, setTime] = useState("7:00 pm");

  return (
    <div className="create-event container">
      <div className="main-form">
        <div className="title">
          <h3>Title</h3>
          <input type="text" name="" id="" placeholder="Title here..." />
        </div>
        <div className="desc">
          <h3>Description</h3>
          <textarea placeholder="Description here..." />
        </div>
        <div className="title-util">
          <h3 className="top-h3">Banner</h3>
          <div className="upload-img">
            <FileUpload setPrevImg={setPrevImg} setFiles={setFiles} />
          </div>
        </div>

        <div className="date-time">
          {/* <div className={`calendar ${calendarToggle ? "open" : ""}`}>
            <Calendar
              value={selectedDay}
              onChange={setSelectedDay}
              shouldHighlightWeekends
              calendarClassName="responsive-calendar"
            />
          </div> */}

          <div className="title-util">
            <h3>Date</h3>
            <div
              className="date"
              onClick={() => setCalendarToggle((toggle) => !toggle)}
            >
              <div className="date-info">
                {selectedDay
                  ? `${selectedDay.day}/${selectedDay.month}/${selectedDay.year}`
                  : "25/06/2022"}
              </div>
              <div className="icon">
                <BsFillCalendarDateFill />
              </div>
            </div>
          </div>

          {/* <div className={`time-picker ${timeToggle ? "open" : ""}`}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticTimePicker
                displayStaticWrapperAs="mobile"
                value={time}
                onChange={(time) => setTime(time)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div> */}

          <div className="title-util">
            <h3>Time</h3>
            <div
              className="time"
              onClick={() => setTimeToggle((toggle) => !toggle)}
            >
              <div className="time-info">{time ? time : "12:00 am"}</div>
              <div className="icon">
                <FcClock />
              </div>
            </div>
          </div>
        </div>
        <div className="title-util">
          <h3 className="reminder-title">Reminder</h3>
          <div className="reminder">
            <div className="icon">
              <IoIosNotifications />
            </div>
            <div className="content">Add the time of event</div>
          </div>
        </div>
        <div className="btn">
          <span>Create Event</span>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
