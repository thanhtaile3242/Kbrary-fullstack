const originalDateString = "2024-01-09T01:53:18.892Z";
const date = new Date(originalDateString);

const formattedDate = `${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
})} - ${date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
})}`;

console.log(formattedDate);
