// Variables to track choices and assignments
let choices = {};
let finalizedSeats = {};

// Event listener for submitting a seat choice
document.getElementById("submit-choice").addEventListener("click", () => {
    let studentNumber = document.getElementById("student-number").value;
    let seatNumber = document.getElementById("seat-number").value;

    if (studentNumber && seatNumber) {
        if (!choices[seatNumber]) {
            // Assign seat if not taken
            choices[seatNumber] = [studentNumber];
        } else {
            // Add student to seat's conflict list
            choices[seatNumber].push(studentNumber);
        }
        alert("Choice submitted! Next student can make a selection.");
    }
    
    // Clear input fields
    document.getElementById("student-number").value = "";
    document.getElementById("seat-number").value = "";
});

// Event listener for finalizing seat assignments
document.getElementById("finalize").addEventListener("click", () => {
    for (let seat in choices) {
        if (choices[seat].length === 1) {
            // No conflict, seat is assigned
            finalizedSeats[seat] = choices[seat][0];
        } else {
            // Conflict resolution needed (rock-paper-scissors)
            alert(`Seat ${seat} has a conflict! Resolve with rock-paper-scissors.`);
        }
    }
    
    // Display final results
    displayResults();
});

// Function to display the final seat assignments
function displayResults() {
    const assignedSeatsDiv = document.getElementById("assigned-seats");
    assignedSeatsDiv.innerHTML = "";

    for (let seat in finalizedSeats) {
        const p = document.createElement("p");
        p.textContent = `Seat ${seat}: Student ${finalizedSeats[seat]}`;
        assignedSeatsDiv.appendChild(p);
    }

    document.getElementById("results").style.display = "block";
    document.getElementById("seat-selection").style.display = "none";
    document.getElementById("finalize").style.display = "none";
}