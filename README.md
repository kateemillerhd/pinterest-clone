# pinterest-clone

A full-stack Pinterest-style image sharing app built with Node.js, Express, MongoDB, and GitHub authentication. 
Users can login with GitHub, share, delete, and browse image collections in a masonry-style layout. 

---

## Features

- GitHub login 
- Authenticated users can add image links
- Users can delete only their own images
- Pinterest-style wall
- Unauthenticated users can browse public image walls
- Broken images replaced with a placeholder
- 

---

## Tech Stack

### Frontend:
- EJS templates
- CSS
- Masonry Layout (Masonry.js)


### Backend:
- Node.js
- Express

### Auth:
- GitHub OAuth with Passport.js

### Database:
- MongoDB

### Session:
- express-session

---

## Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/kateemillerhd/pinterest-clone.get
cd pinterest-clone
```
### 2. Install dependencies

```bash
npm install
```

### 3. Create a .env file

```bash
touch .env
```
Add the following keys:

```bash
SESSION_SECRET=your_session_secret
MONGO_URI=your_mongodb_connection_url
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```
Make sure .env is in your .gitignore!

### 4. Start the app

```bash
node server.js
```

## Author

Kate Miller