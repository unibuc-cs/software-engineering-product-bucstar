# Requirements

User Story: As a user, I want to sign up to have access to the site

Requirements:
- Implement button to “Sign Up with Facebook”
- Implement functionality using Meta Developers

---

User Story: As a user, I want to browse upcoming events so that I can discover those that interest me.

Requirements:
- Display a list of upcoming events on the main page or in an "Upcoming Events" section.
- Implement filters for category, date, location, and other attributes.
- Add a keyword search bar to help users find specific events.
- Provide sorting options for events, such as by popularity or date.

---

User Story: As an event organizer, I want to create events so that other people can join my activity.

Requirements:
- Design an event creation form with fields for title, description, date, time, location, category
- Include an option for setting a maximum participant limit.
- Field for setting participants that are already coming

---

User Story: As a user, I want to view event details so that I can decide if I want to participate.

Requirements:
- Allow users to click on an event to view detailed information.
- Display event title, description, organizer information, location, date, time, and current participant count on the details page.
- Indicate whether the event is free or paid
- Show attendee count and availability if participant limits are set.

---

User Story: As a user, I want to join events so that I can have some fun.

Requirements:
- Require users to log in to join an event.
- Add a "Join" button to the event details page if spots are available.
- Implement a process to add users to the participant list when they join.
- Disable the "Join" button or display a "Full" message if the event reaches capacity.

---

User Story: As a participant, I want to receive a notification confirming my spot once I join an event.

Requirements:
- Implement a real-time notification system to confirm spots after users join an event.
- Include event title, date, time, and location in the confirmation notification.

---

User Story: As a user, I want to view the events I’ve registered for so that I can easily remember where to go.

Requirements:
- Create a "My Events" section displaying a list of registered events.
- Include the title, date, time, and location for each event in the list.
- Allow sorting of registered events by upcoming dates and display only future events.

---

User Story: As a user, I want to have the option to unregister from events I’ve joined so that I can manage my schedule and commitments more effectively.

Requirements:
- Add an "Unregister" button for each registered event in the "My Events" section.
- Remove users from the participant list upon unregistration and confirm the action.

---

User Story: As a user, I want to see events I’ve been to in the past so that I can keep track of my history.

Requirements:
- Create a "Past Events" section, displaying attended events.
- Display title, date, and time for each past event entry.
- Allow users to filter past events by date or category.

---

User Story: As an event organizer, I want to edit my event so that I can fix typos and update needs.

Requirements:
- Provide organizers with an option to edit event details, including title, description, date, time, location, and participant limit.
- Ensure changes are immediately visible to all users viewing the event.
- Send a notification to participants informing them of major changes, such as date, time, or location.

---

User Story: As an event organizer, I want to cancel an event I created so that it notifies participants if the event is no longer happening.

Requirements:
- Add an option to cancel events from the organizer’s event management page.
- Notify all participants upon cancellation, indicating that the event is no longer happening.
- Remove the event from upcoming events
