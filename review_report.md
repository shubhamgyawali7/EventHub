# EventHub Project Review Report

I have reviewed the project logic and identified several critical issues that are affecting the "Find Near Me" functionality and the Event Update/Map redirection process.

## 1. Redirect to Google Maps Issue (Map Redirection)
**Problem:** When you create or update an event, the location might not be saving correctly, or the redirection to Google Maps is referencing old or incorrect data.
**Root Causes:**
*   **Missing Middleware:** The `PUT /api/events/:id` (Update Event) route on the server is missing the `uploadEventPoster` (Multer) middleware. Since the frontend sends `FormData` for updates, the server receives an empty `req.body` because it cannot parse multipart data without Multer. Therefore, any changes to coordinates or the Map URL are never saved during an update.
*   **Redux Action Parameter Mismatch:** In `eventsAction.js`, the `updateEvent` thunk expects `{ eventId, updatedData }`, but it is being called from `EventCreate.jsx` with `{ id, data }`. This results in `undefined` values being sent to the API.

**Consequence if not corrected:**
*   Users will never be able to update event details, locations, or posters.
*   The "View on Maps" link will always show the first location chosen during creation, even if the event location was changed later.

## 2. "Find Near Me" Functionality
**Problem:** The "Find Near Me" button detects the user's location but doesn't actually filter the events list.
**Root Causes:**
*   **Missing Logic in Events.jsx:** The `filteredEvents` logic in `Events.jsx` only filters by `searchTerm` and `category`. It completely ignores `userCoords` and the `useNearby` state.
*   **Backend Support Unused:** The backend already has a `$near` geospatial query implemented in `getNearbyEvents`, but the frontend is not passing the coordinates to the API.

**Consequence if not corrected:**
*   A core feature for users to find local events will remain broken, frustrating users who expect to see events close to them.

## 3. General Code Logic & Improvements
*   **Coordinate Consistency:** While MongoDB and Leaflet use different coordinate orders ([Lng, Lat] vs [Lat, Lng]), the service logic mostly handles this. However, without fixing the update logic, these coordinates remain brittle.
*   **Online Events Handling:** Online events still show "District" and sometimes empty "Venue" labels. This should be cleaned up in the UI.

---

# Phase-wise Improvement Plan

### Phase 1: Fixing the Core Infrastructure (Update & Redux)
1.  **Server:** Add Multer middleware to the Update Event route.
2.  **Server:** Update `eventsController.js` to handle potential image updates and parse field types correctly from FormData.
3.  **Client:** Fix `eventsAction.js` to correctly destructure parameters for updates.

### Phase 2: Implementing "Find Near Me"
1.  **Client:** Update `eventService.jsx` and Redux actions to accept `lat`, `lng`, and `radius` parameters.
2.  **Client:** Update `Events.jsx` to trigger a re-fetch of events when "Find Near Me" is toggled.

### Phase 3: UI/UX Polishing
1.  **Client:** Update `EventDetails.jsx` to better handle "Online" vs "Physical" display.
2.  **Client:** Add distance indicators to event cards when "Near Me" is active.
