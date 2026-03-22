from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

# ---------- Database setup ----------
def init_db():
    """Create the messages table if it doesn't exist."""
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS messages (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            name       TEXT    NOT NULL,
            email      TEXT    NOT NULL,
            message    TEXT    NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

# ---------- Routes ----------
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/submit", methods=["POST"])
def submit():
    """Receive form data and insert it into the database."""
    name    = request.form.get("name", "").strip()
    email   = request.form.get("email", "").strip()
    message = request.form.get("message", "").strip()

    # Basic validation
    if not name or not email or not message:
        return jsonify({"success": False, "error": "All fields are required."}), 400

    # Insert into DB
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
        (name, email, message)
    )
    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": "Thanks! Your message was saved."})


@app.route("/messages")
def view_messages():
    """Admin page — shows all saved contact messages."""
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM messages ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()
    return render_template("messages.html", messages=rows)


# ---------- Entry point ----------
if __name__ == "__main__":
    init_db()           # creates table on first run
    app.run(debug=True) # debug=True auto-reloads on file save
