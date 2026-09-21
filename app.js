function showPage(currentId, nextId) {
  document.getElementById(currentId).classList.add("hidden");
  const nextPage = document.getElementById(nextId);
  nextPage.classList.remove("hidden");
  nextPage.classList.add("fade");
}

const fox = document.getElementById("fox");
const foxMessage = document.getElementById("fox-message");
const waterBtn = document.getElementById("water-btn");
const waterCount = document.getElementById("water-count");
const alarmBtn = document.getElementById("alarm-btn");
const alarmTimeInput = document.getElementById("alarm-time");
const alarmStatus = document.getElementById("alarm-status");

let glasses = 0;
let alarmTime = null;

// Startup form submission
document.getElementById("startup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const age = form.age.value;
  const height = form.height.value;
  const weight = form.weight.value;
  const activity = form.activity.value;
  const diet = form.diet.value;

  // Simple calorie estimate
  let calories = 10 * weight + 6.25 * height - 5 * age + 5;
  if (activity === "Moderate") calories *= 1.55;
  if (activity === "Active") calories *= 1.75;

  document.getElementById("calories").textContent =
    `Estimated daily calories: ${Math.round(calories)} kcal`;

  // Generate meal plan
  let meals = [];
  if (diet === "Vegetarian") {
    meals = [
      "Breakfast: Oatmeal with berries 🍓",
      "Lunch: Lentil soup 🥣",
      "Dinner: Veggie stir-fry 🥦"
    ];
  } else if (diet === "Vegan") {
    meals = [
      "Breakfast: Smoothie with oats 🍌",
      "Lunch: Quinoa salad 🥗",
      "Dinner: Chickpea curry 🍛"
    ];
  } else if (diet === "Halal") {
    meals = [
      "Breakfast: Eggs and toast 🍳",
      "Lunch: Grilled chicken salad 🥗",
      "Dinner: Salmon with veggies 🐟"
    ];
  } else if (diet === "Ghanaian") {
    meals = [
      "Breakfast: Koko (millet porridge) with bread 🍞",
      "Lunch: Jollof rice with grilled chicken 🍗",
      "Dinner: Banku with tilapia and pepper sauce 🐟🌶️"
    ];
  } else {
    meals = [
      "Breakfast: Yogurt with fruit 🍎",
      "Lunch: Turkey sandwich 🥪",
      "Dinner: Beef stir-fry 🥩"
    ];
  }

  document.getElementById("meals").innerHTML = meals.map(m => `<li>${m}</li>`).join("");

  foxMessage.textContent = "Here’s your personalized dashboard 🦊";
  showPage("startup","dashboard");
  logDay();
});

// Water tracker
waterBtn.addEventListener("click", () => {
  glasses++;
  waterCount.textContent = glasses;
  fox.classList.add("wave");
  foxMessage.textContent = "Great job! Stay hydrated 💧";
  setTimeout(() => fox.classList.remove("wave"), 2000);
});

// Alarm logic
alarmBtn.addEventListener("click", () => {
  alarmTime = alarmTimeInput.value;
  if (alarmTime) {
    alarmStatus.textContent = `Alarm set for ${alarmTime} ⏰`;
    foxMessage.textContent = "Alarm set! You’ll wake up fresh ⏰";
  } else {
    alarmStatus.textContent = "Please select a time.";
  }
});

// Check alarm every minute
setInterval(() => {
  if (alarmTime) {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0,5); // HH:MM format
    if (currentTime === alarmTime) {
      foxMessage.textContent = "⏰ Wake up! Time to start your day!";
      alarmStatus.textContent = "Alarm ringing!";
      alarmTime = null; // reset after ringing
    }
  }
}, 60000);

// Progress log
function logDay() {
  const today = new Date().toDateString();
  let days = JSON.parse(localStorage.getItem("loggedDays")) || [];
  if (!days.includes(today)) {
    days.push(today);
    localStorage.setItem("loggedDays", JSON.stringify(days));
  }
  document.getElementById("progress-list").innerHTML =
    days.map(d => `<li>${d}</li>`).join("");
}
