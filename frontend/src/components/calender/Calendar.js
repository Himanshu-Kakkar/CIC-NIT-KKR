import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import './calender.css'
import Swal from "sweetalert2";

/**
 * ScheduleCalendar Component
 * A full-featured calendar component that allows users to:
 * - View events in month, week, and day views
 * - Create new events by selecting dates
 * - Delete events by clicking on them
 * - Drag and drop events to reschedule
 * - Resize events to change their duration
 */
function ScheduleCalendar() {
  // State to store calendar events
  const [events, setEvents] = useState([]);
  // Ref to access calendar API methods
  const calendarRef = useRef(null);

  // Fetch existing events when component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5001/calendarschema");
        const calendarEvents = response.data.map((event) => {
          return {
            title: event.title,
            start: event.start,
            // end: event.end,
            id: event._id,
          };
        });
        setEvents(calendarEvents);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  /**
   * Handles the creation of new events when a date range is selected
   * Shows a prompt for event title and creates the event if confirmed
   */
  function handleDateSelect(selectInfo) {
    Swal.fire({
      title: "Enter a new title for your event",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Create" ,
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        let title = result.value;
        let calendarApi = selectInfo.view.calendar;
  
        calendarApi.unselect(); // clear date selection
  
        if (title) {
          const event = {
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
          };
  
          // Create new event in the backend
          axios
            .post("http://localhost:5001/calendarschema", event)
            .then((response) => {
              setEvents([...events, { ...event, id: response.data._id }]);
            });
        }
      }
    });
  }

  /**
   * Handles event deletion when an event is clicked
   * Shows a confirmation dialog before deleting
   */
  function handleEventRemove(clickInfo) {
    Swal.fire({
      title: `Are you sure you want to delete the event '${clickInfo.event.title}'?`,
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete event from backend and update state
        axios.delete(`http://localhost:5001/calendarschema/${clickInfo.event.id}`).then(() => {
          const filteredEvents = events.filter((event) => event.id !== clickInfo.event.id);
          setEvents(filteredEvents);
        });
      }
    });
  }

  /**
   * Handles event updates when an event is dragged or resized
   * Updates both the backend and the calendar display
   */
  function handleEventUpdate(updateInfo, calendarApi) {
    const { event } = updateInfo;
    const updatedEvent = {
      ...event,
      start: updateInfo.start,
      end: updateInfo.end,
    };
    axios.put(`http://localhost:5001/calendarschema/${event.id}`, updatedEvent).then(() => {
      calendarApi.getApi().updateEvent(updatedEvent);
    });
  }

  /**
   * Handles adding a new event for the current date
   * Shows a prompt for event title and creates the event if provided
   */
  function handleAddEvent() {
    let title = prompt("Please enter a title for your event:");

    if (title) {
      const event = {
        title,
        start: new Date(),
        allDay: true,
      };

      // Create new event in the backend
      axios.post('http://localhost:5001/calendarschema', event).then((response) => {
        setEvents([...events, { ...event, id: response.data._id }]);
      });
    }
  }

  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={handleDateSelect}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable={true}
        eventDurationEditable={true}
        eventResize={(updateInfo) => handleEventUpdate(updateInfo, calendarRef)}
        eventDrop={(updateInfo) => handleEventUpdate(updateInfo, calendarRef)}
        eventClick={handleEventRemove}
        events={events}
      />
    </div>
  );
}

export default ScheduleCalendar;