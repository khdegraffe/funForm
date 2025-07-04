const form = document.getElementById("subscribeForm");
const emailInput = document.getElementById("email");
const checkbox = document.getElementById("terms");
const submitBtn = document.getElementById("submitBtn");
const emailError = document.getElementById("emailError");
const modal = document.getElementById("thankYouModal");
const closeModalBtn = document.getElementById("closeModal");
const darkModeToggle = document.getElementById("darkModeToggle");

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function updateFormState() {
  const emailValid = validateEmail(emailInput.value);
  const termsChecked = checkbox.checked;

  if (!emailValid && emailInput.value !== "") {
    emailError.style.display = "block";
    emailInput.classList.add("invalid");
  } else {
    emailError.style.display = "none";
    emailInput.classList.remove("invalid");
  }

  submitBtn.disabled = !(emailValid && termsChecked);
}

emailInput.addEventListener("input", updateFormState);
checkbox.addEventListener("change", updateFormState);

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    email: emailInput.value,
    consent: checkbox.checked,
  };

  try {
    submitBtn.textContent = "Submitting...";
    submitBtn.disabled = true;

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      form.reset();
      updateFormState();
      modal.classList.remove("hidden");
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (err) {
    console.error(err);
    alert("Error connecting to the server.");
  } finally {
    submitBtn.textContent = "Enlist";
  }
});
