// Check for stored exercises on load and display them
document.addEventListener("DOMContentLoaded", function() {
    const storedExercises = JSON.parse(localStorage.getItem("exercises"));
    if (storedExercises) {
        storedExercises.forEach(exercise => addExerciseToTable(exercise.exerciseName, exercise.reps, exercise.date));
    }
    updateTotalReps();
});

function addExercise() {
    // Get input values
    const exerciseName = document.getElementById("exercise").value.trim();
    const reps = parseInt(document.getElementById("reps").value);
    const date = new Date().toLocaleDateString(); // Get the current date

    if (exerciseName === "" || isNaN(reps)) {
        alert("Please fill out both fields correctly.");
        return;
    }

    addExerciseToTable(exerciseName, reps, date);
    saveExercise(exerciseName, reps, date);

    // Clear the input fields
    document.getElementById("exercise").value = "";
    document.getElementById("reps").value = "";
}

function addExerciseToTable(exerciseName, reps, date) {
    const table = document.getElementById("exerciseTable");

    // Create a new row and cells
    const newRow = table.insertRow();
    newRow.insertCell(0).textContent = exerciseName;
    newRow.insertCell(1).textContent = reps;
    newRow.insertCell(2).textContent = date; // Display the date

    // Delete button
    const deleteCell = newRow.insertCell(3);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        // Remove the exercise from local storage and update the total reps
        removeExercise(exerciseName, reps);
        newRow.remove();
        updateTotalReps();
    };
    deleteCell.appendChild(deleteButton);

    updateTotalReps();
}

function updateTotalReps() {
    const table = document.getElementById("exerciseTable");
    let totalReps = 0;

    for (let i = 0; i < table.rows.length; i++) {
        totalReps += parseInt(table.rows[i].cells[1].textContent);
    }

    document.getElementById("totalReps").textContent = totalReps;
}

function saveExercise(exerciseName, reps, date) {
    let exercises = JSON.parse(localStorage.getItem("exercises")) || [];
    exercises.push({ exerciseName, reps, date });
    localStorage.setItem("exercises", JSON.stringify(exercises));
}

function removeExercise(exerciseName, reps) {
    let exercises = JSON.parse(localStorage.getItem("exercises")) || [];
    exercises = exercises.filter(ex => !(ex.exerciseName === exerciseName && ex.reps === reps));
    localStorage.setItem("exercises", JSON.stringify(exercises));
}
