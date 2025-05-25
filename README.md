# 📱 LiveLink

LiveLink is a gamified social web platform that makes it fun and easy to connect with friends, discover new activities, and plan events. Users can log in via phone number, explore activity recommendations powered by AI, track their social experiences, and personalize their profile.

---

## 🚀 Features

- 🔐 **Phone Number Login**  
  Secure login using Twilio Verify API with SMS code authentication.

- 🎯 **Event Discovery & Recommendations**  
  AI-generated suggestions powered by Cohere based on group size and activity type.

- 🧑‍💼 **Profile Page**  
  Modern, styled profile layout with user info and future video + action sections.

- 🧭 **Navigation Sidebar**  
  Intuitive layout for navigating between Events, Friends, Discovery, and Profile.

- 📦 **Component-Based Architecture**  
  Built with React and organized into reusable components and pages.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), JavaScript, CSS Modules
- **Backend:** Node.js + Express
- **APIs:**
  - [Twilio Verify API](https://www.twilio.com/docs/verify)
  - [Cohere Generate API](https://docs.cohere.com/reference/generate)
  - [Numverify API](https://numverify.com/documentation)

---

## 📂 Project Structure

frontendmain/
├── src/
│ ├── assets/ # Images for profile/header
│ ├── components/ # Sidebar, EventsContext, etc.
│ ├── pages/ # Profile.jsx, Discovery.jsx, Events.jsx...
│ ├── App.jsx # App routing structure
│ └── main.jsx # App entry
└── public/

backend/
├── server.js # Express backend with Cohere routes


---

## ⚙️ Getting Started

### 🔧 Prerequisites

- Node.js v18 or higher
- Cohere API key (https://dashboard.cohere.com/api-keys)

---

### 🚦 Setup Instructions

1. **Clone the repo:**

   ```bash
   git clone https://github.com/yourusername/livelink.git
   cd livelink

COHERE_API_KEY=your_cohere_key

Run the backend: 
node server.js

Run the frontend: 
cd frontendmain
npm run dev
