const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

// theme
const themeSelects = document.querySelectorAll("[data-theme]");
const html = document.documentElement;

//Define function to calculate based on button clicked.
const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && output !== "") {
    //If output has '%', replace with '/100' before evaluating.
    output = eval(output.replace("%", "/100"));
  } else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    //If DEL button is clicked, remove the last character from the output.
    output = output.toString().slice(0, -1);
  } else {
    //If output is empty and button is specialChars then return
    if (output === "" && specialChars.includes(btnValue)) return;
    output += btnValue;
  }
  display.value = output;
};

//Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
  //Button click listener calls calculate() with dataset value as argument.
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});


// Handle switch theme
themeSelects.forEach((select) => {
  select.addEventListener("change", () => {
    const theme = select.value;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme-calc", theme);
  });
});

// get theme preference


const getThemePreference = () => {
  const theme = localStorage.getItem("theme-calc") ?? "default";
  const toggle = document.querySelector(`input[data-theme=${theme}]`);
  const media = matchMedia("(prefers-color-scheme: dark)");

  // menyetel / menggunakan theme yg tersimpan di localStorage ke app
  if (theme) {
    html.setAttribute("data-theme", theme);
    toggle.checked = true;
    return;
  }

  // menyetel theme ke app sesuai dengan theme sistem device
  if (media.matches) {
    html.setAttribute("data-theme", "dark");
    toggle.checked = true;
  } else {
    html.setAttribute("data-theme", theme);
    toggle.checked = true;
  }
};

getThemePreference();