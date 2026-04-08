# Near Location Event Selection Implementation

This document explains the technical implementation of the "Near Me" event discovery feature in EventHub.

## 1. Core Logic Overview
The feature follows a three-tier implementation:
1.  **Frontend**: Captures user coordinates via the Browser Geolocation API.
2.  **Backend**: Processes proximity requests using specialized MongoDB operators.
3.  **Database**: Uses Geospatial indexing to perform high-performance distance calculations.

---

## 2. Technical Implementation

### A. Database Layer (Schema & Indexing)
To enable location-based searching, we store coordinates in **GeoJSON** format and apply a `2dsphere` index.

**File:** `server/src/models/Events.js`
```javascript
// GeoJSON Field Definition
location: {
  type: { type: String, enum: ["Point"], default: "Point" },
  coordinates: { type: [Number] }, // [Longitude, Latitude]
},

// Geospatial Indexing
eventSchema.index({ location: "2dsphere", sparse: true });
```

### B. Backend Layer (Service Logic)
We utilize the `$near` operator. It calculates distance on a sphere and automatically sorts results by proximity.

**File:** `server/src/services/eventService.js`
```javascript
const getNearbyEvents = async (longitude, latitude, radiusKm = 10, limit = 100) => {
  const radiusMeters = radiusKm * 1000; 

  return await Events.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [longitude, latitude] },
        $maxDistance: radiusMeters,
      },
    },
    status: "published", // Only show active events
  })
  .populate("organizer", "name logo district")
  .limit(limit);
};
```

### C. Frontend Layer (User Interaction)
The frontend triggers a request for the user's current position and updates the event list.

**File:** `client/src/pages/public/Events.jsx`
```javascript
const handleNearMeClick = () => {
    if (!navigator.geolocation) return alert("Not supported");

    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        
        // Dispatch action or call API with coordinates
        fetchEvents({ lat: latitude, lng: longitude, radius: 20 });
    });
};
```

---

## 3. Why This Approach?

| Component | Choice | Reason |
| :--- | :--- | :--- |
| **Indexing** | `2dsphere` | Essential for accurate "great-circle" distance calculations on Earth's curved surface. |
| **Logic** | `$near` | Most efficient query for proximity. Unlike `$geoWithin`, `$near` handles the sorting automatically. |
| **Data Format** | GeoJSON | Follows international standards, making it easy to integrate with maps (Leaflet/Google Maps). |
| **API** | Geolocation | Native browser support requires no third-party keys and is privacy-conscious (requires user consent). |

---
*Documented by Antigravity AI*
