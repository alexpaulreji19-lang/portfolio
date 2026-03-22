// Contact form — sends data to Flask via fetch, shows status message

const form       = document.getElementById("contact-form");
const submitBtn  = document.getElementById("submit-btn");
const statusEl   = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // stop the page from reloading

  // Disable button while submitting
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";
  statusEl.textContent = "";
  statusEl.className = "form-status";

  // Collect form data
  const formData = new FormData(form);

  try {
    // POST to /submit (our Flask route)
    const response = await fetch("/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      statusEl.textContent = "✓ " + data.message;
      statusEl.classList.add("success");
      form.reset(); // clear the fields
    } else {
      statusEl.textContent = "✗ " + (data.error || "Something went wrong.");
      statusEl.classList.add("error");
    }
  } catch (err) {
    statusEl.textContent = "✗ Network error. Please try again.";
    statusEl.classList.add("error");
  }

  // Re-enable button
  submitBtn.disabled = false;
  submitBtn.textContent = "Send message →";
});
