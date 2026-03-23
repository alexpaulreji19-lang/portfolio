const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";
  statusEl.textContent = "";
  statusEl.className = "form-status";

  const formData = new FormData(form);

  try {
    const response = await fetch("/submit", {   // relative URL — works on any domain
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      statusEl.textContent = "✓ " + data.message;
      statusEl.classList.add("success");
      form.reset();
    } else {
      statusEl.textContent = "✗ " + (data.error || "Something went wrong.");
      statusEl.classList.add("error");
    }
  } catch (err) {
    statusEl.textContent = "✗ Network error. Please try again.";
    statusEl.classList.add("error");
    console.error("Submit error:", err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send message →";
  }
});
