const DAY_ABBR = {
  Monday: "MON",
  Tuesday: "TUE",
  Wednesday: "WED",
  Thursday: "THU",
  Friday: "FRI",
  Saturday: "SAT",
  Sunday: "SUN",
};

function abbreviate(dayLine) {
  const match = Object.keys(DAY_ABBR).find((day) => dayLine.startsWith(day));
  return match ? DAY_ABBR[match] : dayLine.slice(0, 3).toUpperCase();
}

/**
 * Chart component
 * @param {string} plan - AI response text (weekly plan)
 */
export default function Chart({ plan }) {
  if (!plan) return null;

  // Split the AI response by days (assuming each day starts with "Monday:", "Tuesday:", etc.)
  const days = plan
    .split(/\n(?=Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/)
    .filter((chunk) => chunk.trim().length > 0);

  return (
    <div className="day-grid">
      {days.map((dayText, index) => {
        const [dayLine, ...meals] = dayText.split("\n").filter(Boolean);
        return (
          <div key={index} className="day-card">
            <div className="day-card-head">
              <span className="day-badge">{abbreviate(dayLine)}</span>
              <h3>{dayLine.replace(/^[:\-\s]+|[:\-\s]+$/g, "")}</h3>
            </div>
            <ul className="meal-list">
              {meals.map((meal, i) => (
                <li key={i}>{meal.replace(/^[-•\s]+/, "")}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}