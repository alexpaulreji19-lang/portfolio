# Portfolio Website — College Project

A full-stack portfolio with a contact form that saves messages to a SQLite database.
Built with HTML · CSS · JS · Python · Flask. Deployed via CI/CD on Render.

---

## Project structure

```
project/
├── app.py               ← Flask backend (routes + DB logic)
├── database.db          ← SQLite database (auto-created on first run)
├── requirements.txt     ← Python dependencies
├── Procfile             ← Tells Render how to start the app
├── .gitignore           ← Files NOT to commit to GitHub
├── templates/
│   ├── index.html       ← Portfolio page
│   └── messages.html    ← Admin page to view submissions
└── static/
    ├── style.css        ← All styles
    └── script.js        ← Form submission logic
```

---

## Step 1 — Run locally

```bash
# 1. Create a virtual environment
python -m venv venv

# 2. Activate it
#    On Windows:
venv\Scripts\activate
#    On Mac/Linux:
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Start the app
python app.py
```

Open http://127.0.0.1:5000 in your browser.
Fill the contact form → check http://127.0.0.1:5000/messages to see the DB insertion.

---

## Step 2 — Push to GitHub

```bash
git init
git add .
git commit -m "initial commit: portfolio with flask and sqlite"
```

Then on GitHub.com:
1. Click "New repository" → name it (e.g. `portfolio`)
2. Copy the commands under "push an existing repository" and run them

---

## Step 3 — Deploy on Render (free)

1. Go to https://render.com and sign up with your GitHub account
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Render auto-detects the Procfile and sets:
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn app:app`
5. Click "Create Web Service" — you get a live URL!

---

## Step 4 — CI/CD is already set up!

Every time you push a new commit to GitHub, Render automatically redeploys.
That's the CI/CD pipeline. Show your professor the "Deploys" tab in Render dashboard.

```bash
# Make a change, then:
git add .
git commit -m "update something"
git push
# → Render automatically redeploys within ~1 minute
```
