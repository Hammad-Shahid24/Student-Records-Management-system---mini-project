let recordName = "";
let score1 = 0;
let score2 = 0;
let score3 = 0;

const recordNameInputField = document.getElementsByClassName(
  "record-name-input-field"
)[0];

const recordScoreInputFields = document.getElementsByClassName(
  "record-score-input-field"
);

recordNameInputField.addEventListener("input", (e) => {
  const input = e.target;
  input.value = input.value.replace(/[^a-zA-Z\s]/g, ""); // Remove non-alphabet characters
  recordName = input.value;
});

const validateScoreInput = (input) => {
  let value = input.value;

  if (!/^\d*$/.test(value)) {
    input.value = value.replace(/\D/g, "");
  }

  value = input.value;

  // Ensure the value is within the range 0-100
  if (value > 100) {
    input.value = 100;
  } else if (value < 0) {
    input.value = 0;
  }
};

recordScoreInputFields[0].addEventListener("input", (e) => {
  validateScoreInput(e.target);
  score1 = e.target.value;
});

recordScoreInputFields[1].addEventListener("input", (e) => {
  validateScoreInput(e.target);
  score2 = e.target.value;
});

recordScoreInputFields[2].addEventListener("input", (e) => {
  validateScoreInput(e.target);
  score3 = e.target.value;
});

const createRecordButton =
  document.getElementsByClassName("create-record-btn")[0];

// Function to create a student record in the local storage
const createStudentRecord = async (studentRecord) => {
  try {
    const studentRecords =
      JSON.parse(localStorage.getItem("studentRecords")) || [];
    studentRecords.push(studentRecord);
    localStorage.setItem("studentRecords", JSON.stringify(studentRecords));
    console.log("Student record successfully created");
  } catch (error) {
    console.error("Error creating student record:", error);
  }
};

createRecordButton.addEventListener("click", async () => {
  if (!recordName || !score1 || !score2 || !score3) {
    alert("Please fill in all fields to create a student record");
    return;
  }

  const studentRecord = {
    recordName,
    score1,
    score2,
    score3,
  };

  console.log("Student Record:", studentRecord);

  try {
    await createStudentRecord(studentRecord);
    // Clear the input fields after creating the student record
    recordNameInputField.value = "";
    recordScoreInputFields[0].value = "";
    recordScoreInputFields[1].value = "";
    recordScoreInputFields[2].value = "";
    calculateScores();
    //msg for user to know that record is created
    alert("Student record successfully created");
  } catch (error) {
    console.error("Error creating student record:", error);
  }
});

const averageScoreText = document.getElementsByClassName("average-score")[0];
const highestScoreText = document.getElementsByClassName("highest-score")[0];
const lowestScoreText = document.getElementsByClassName("lowest-score")[0];

// Fetch the array of student records from local storage and calculate the average score, highest score, and lowest score
const calculateScores = () => {
  const studentRecords =
    JSON.parse(localStorage.getItem("studentRecords")) || [];

  let totalScore = 0;
  let highestScore = 0;
  let lowestScore = Infinity;

  studentRecords.forEach((record) => {
    const recordTotalScore =
      parseInt(record.score1) +
      parseInt(record.score2) +
      parseInt(record.score3);
    totalScore += recordTotalScore;

    if (recordTotalScore > highestScore) {
      highestScore = recordTotalScore;
    }

    if (recordTotalScore < lowestScore) {
      lowestScore = recordTotalScore;
    }
  });

  const averageScore = totalScore / studentRecords.length;
  if (averageScore && !isNaN(averageScore)) {
    averageScoreText.textContent = `Average Score: ${averageScore.toFixed(2)}`;
  }

  if (highestScore && !isNaN(highestScore)) {
    highestScoreText.textContent = `Highest Score: ${highestScore}`;
  }

  if (lowestScore !== Infinity && !isNaN(lowestScore)) {
    lowestScoreText.textContent = `Lowest Score: ${lowestScore}`;
  }
};

// Call the function to calculate and display the scores
calculateScores();
