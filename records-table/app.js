// Closure to track the number of records created
const recordCounter = (() => {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count,
  };
})();

// Function to retrieve student records from local storage
const getStudentRecords = () => {
  return JSON.parse(localStorage.getItem("studentRecords")) || [];
};

// Function to display student records in the table
const displayStudentRecords = () => {
  const studentRecords = getStudentRecords();
  const recordCount = document.querySelector(".record-count");
  const tbody = document.querySelector(".records-table tbody");
  tbody.innerHTML = ""; // Clear existing rows

  studentRecords.forEach((record, index) => {
    const totalScore =
      parseInt(record.score1) +
      parseInt(record.score2) +
      parseInt(record.score3);
    const averageScore = totalScore / 3; // Calculate the average score

    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${record.recordName}</td>
        <td>${record.score1}</td>
        <td>${record.score2}</td>
        <td>${record.score3}</td>
        <td>${averageScore.toFixed(2)}</td> <!-- Display the average score -->
      </tr>
    `;
    tbody.insertAdjacentHTML("beforeend", row);
    recordCounter.increment();
    recordCount.innerHTML = `Total Records: ${recordCounter.getCount()}`;
  });
};

// Call the function to display the records on page load
document.addEventListener("DOMContentLoaded", displayStudentRecords);
