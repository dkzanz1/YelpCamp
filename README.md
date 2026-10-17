
# YelpCamp — Full-Stack Web Application (`yelpcamp`)

[![CI Build Verification](https://github.com/dkzanz1/yelpcamp/actions/workflows/node.js.yml/badge.svg)](https://github.com/dkzanz1/yelpcamp/actions/workflows/node.js.yml)
![Stack](https://img.shields.io/badge/stack-Node.js%20%7C%20Express%20%7C%20MongoDB%20%7C%20Bootstrap-brightgreen)
![Type](https://img.shields.io/badge/type-Learning%20Case%20Study-blue)

A complete, full-stack web application designed to allow users to create, review, and map campground locations worldwide. Developed as an intensive hands-on build to master server-side rendering, RESTful routing, NoSQL data modeling, authentication, and web security.

> **Context:** Built following Colt Steele's Web Developer Bootcamp curriculum, focused on establishing core backend fundamentals, database architecture, and secure web application development.

---

## 🛠️ Key Architectural & Engineering Learnings

- **RESTful Architecture:** Implemented full CRUD functionality using REST design patterns across campgrounds, reviews, and user routes.
- **Authentication & Authorization:** Integrated `Passport.js` with session management and password hashing for secure authentication, alongside middleware-based route authorization.
- **Database Modeling:** Modeled relational data within a NoSQL database (MongoDB / Mongoose) using schema relationships (one-to-many references and embedded docs).
- **Media & Mapping Services:** Integrated Cloudinary API for cloud image hosting and Mapbox for interactive geocoding and clustering maps.
- **Web Security:** Implemented defensive security measures including Sanitization against Mongo Injection, Helmet HTTP headers, and Content Security Policy (CSP) headers.

---

## 💻 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ODM
- **Authentication:** Passport.js, Express-Session
- **Frontend / Rendering:** EJS (Embedded JavaScript), Bootstrap 5
- **Third-Party APIs:** Mapbox GL JS, Cloudinary
- **Quality & CI:** GitHub Actions (Node.js CI runner)

---

## ⚙️ Local Setup & Installation

To run this application locally:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/dkzanz1/yelpcamp.git](https://github.com/dkzanz1/yelpcamp.git)
   cd yelpcamp
