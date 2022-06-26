import React, { useState } from "react";
import { BigButton, Button, FileUpload, Map, MarkdownEditor } from "../../components/import";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FcHome } from "react-icons/fc";
import { FcClock } from "react-icons/fc";
import { FaCity } from "react-icons/fa";
import moment from "moment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import TextField from "@mui/material/TextField";
import "./CreateEvent.scss";

const CreateEvent = () => {
  const [files, setFiles] = useState([]);
  const [prevImg, setPrevImg] = useState();
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [calendarToggle, setCalendarToggle] = useState(false);
  const [timeToggle, setTimeToggle] = useState(false);
  const [time, setTime] = useState(new Date());
  const [markdownVal, setMarkdownVal] = useState("");
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  return (
    <div className="create-event container page">
      <h1>New Event</h1>
      <div className="main-form">
        <div className="title">
          <h3>Title</h3>
          <input type="text" name="" id="" placeholder="Title here..." />
        </div>
        <div className="desc">
          <h3>Description</h3>
          <MarkdownEditor setMarkdownVal={setMarkdownVal} />
        </div>
        <div className="title-util">
          <h3 className="top-h3">Banner</h3>
          <div className="upload-img">
            <FileUpload setPrevImg={setPrevImg} setFiles={setFiles} />
          </div>
        </div>

        <div className="date-time">
          <div className={`calendar ${calendarToggle ? "open" : ""}`}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                label="Week picker"
                value={selectedDay}
                onChange={(date) => {
                  setSelectedDay(date);
                }}
                // renderDay={renderWeekPickerDay}
                renderInput={(params) => <TextField {...params} />}
                inputFormat="DD/MM/YY"
              />
            </LocalizationProvider>
          </div>

          <div className="title-util">
            <h3>Date</h3>
            <div
              className="date"
              onClick={() => setCalendarToggle((toggle) => !toggle)}
            >
              <div className="date-info">
                {moment(selectedDay).format("DD/MM/YY")}

              </div>
              <div className="icon">
                <BsFillCalendarDateFill />
              </div>
            </div>
          </div>

          <div className={`time-picker ${timeToggle ? "open" : ""}`}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticTimePicker
                displayStaticWrapperAs="mobile"
                value={time}
                onChange={(time) => setTime(time)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>

          <div className="title-util">
            <h3>Time</h3>
            <div
              className="time"
              onClick={() => setTimeToggle((toggle) => !toggle)}
            >
              <div className="time-info">{time ? moment(time).format("hh:mm a") : "12:00 am"}</div>
              <div className="icon">
                <FcClock />
              </div>
            </div>
          </div>
        </div>
        <div className="location-input">
          <span><FaCity /></span>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Event city" />
        </div>
        <div className="location-input">
          <span><FcHome /></span>
          <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Event address..." />
        </div>
        <div className="map">
          <Map setLatitude={setLatitude} setLongitude={setLongitude} />
        </div>
        <div className="btn">
          <BigButton>
            Create Event
          </BigButton>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
