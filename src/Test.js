// Connection URI

// Sample date string in "dd/mm/yyyy" format
const dateString = "13/01/2024";

// Convert the date string to a JavaScript Date object
const dateArray = dateString.split("/");
const day = parseInt(dateArray[0], 10);
const month = parseInt(dateArray[1], 10) - 1; // Months are zero-based in JavaScript Dates
const year = parseInt(dateArray[2], 10);

const dateObject = new Date(year, month, day);

console.log(dateObject);
