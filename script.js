let choices = {}; // Store seat choices keyed by student number
let submittedStudents = new Set(); // Track students who have submitted
let conflicts = {}; // Track conflicts

function submitChoice() {
    const studentNumber = document.getElementById("studentNumber").value;
    const seatChoice = document.getElementById("seatChoice").value;

    // Check if the inputs are valid
    if (!studentNumber || !seatChoice || choices[studentNumber]) {
        alert("入力が無効です。すでに選択した席を選ばないでください。");
        return;
    }

    choices[studentNumber] = seatChoice;
    submittedStudents.add(studentNumber);
    updateStatus();
}

function updateStatus() {
    const submittedList = Array.from(submittedStudents).sort((a, b) => a - b);
    const unsubmittedList = Array.from({length: 39}, (_, i) => (i + 1).toString())
        .filter(num => !submittedStudents.has(num))
        .sort((a, b) => a - b);

    document.getElementById("submitted").innerText = submittedList.join(", ");
    document.getElementById("unsubmitted").innerText = unsubmittedList.join(", ");
}

function revealChoices() {
    document.getElementById("results").style.display = "block";
    const table = document.getElementById("choicesTable");
    table.innerHTML = "<tr><th>出席番号</th><th>席番号</th></tr>";

    for (let student in choices) {
        const row = document.createElement("tr");
        const studentCell = document.createElement("td");
        const seatCell = document.createElement("td");
        
        studentCell.innerText = student;
        seatCell.innerText = choices[student];

        row.appendChild(studentCell);
        row.appendChild(seatCell);
        table.appendChild(row);
    }

    checkForConflicts();
    displayUnselectedSeats(); // Show unselected seats
}

function checkForConflicts() {
    conflicts = {}; // Reset conflicts

    // Check for duplicate seat selections
    for (let student in choices) {
        const seat = choices[student];
        if (!conflicts[seat]) {
            conflicts[seat] = []; // Initialize array for this seat
        }
        conflicts[seat].push(student); // Add student to seat array
    }

    // Filter out seats with only one student
    for (const seat in conflicts) {
        if (conflicts[seat].length <= 1) {
            delete conflicts[seat]; // Remove seats with no conflicts
        }
    }

    // Show conflicts if any
    if (Object.keys(conflicts).length > 0) {
        displayConflicts();
    } else {
        document.getElementById("conflicts").style.display = "none"; // No conflicts
        alert("すべての席が確定しました。");
    }
}

function displayConflicts() {
    const conflictTable = document.getElementById("conflictTable");
    conflictTable.innerHTML = "<tr><th>席番号</th><th>出席番号</th></tr>";

    for (const seat in conflicts) {
        const row = document.createElement("tr");
        const seatCell = document.createElement("td");
        const studentCell = document.createElement("td");
        
        seatCell.innerText = seat;
        studentCell.innerText = conflicts[seat].join(", ");

        row.appendChild(seatCell);
        row.appendChild(studentCell);
        conflictTable.appendChild(row);
    }

    document.getElementById("conflicts").style.display = "block"; // Show conflict section
}

function resolveConflicts() {
    // This function should allow manual input for conflict resolution
    const seatNumber = prompt("競合を解決する席番号を入力してください:");
    if (conflicts[seatNumber]) {
        const winners = prompt(`次の出席番号の中から勝者を選んでください:\n${conflicts[seatNumber].join(", ")}`);
        if (winners && conflicts[seatNumber].includes(winners)) {
            // Confirm the chosen winner and remove the losers
            const winnerIndex = conflicts[seatNumber].indexOf(winners);
            const losers = conflicts[seatNumber].filter((_, index) => index !== winnerIndex);

            // Update the choices to reflect the confirmed seat
            choices[winners] = seatNumber;

            // Remove losers from submitted students and choices
            for (const loser of losers) {
                delete choices[loser];
                submittedStudents.delete(loser);
            }

            // Update status and check for new conflicts
            updateStatus();
            revealChoices(); // Show updated choices
        } else {
            alert("勝者として無効な出席番号です。");
        }
    } else {
        alert("指定された席番号に競合はありません。");
    }
}



    const resultsDiv = document.getElementById("results");
    resultsDiv.appendChild(unselectedTable); // Append the unselected seats table to the results section
}
function displayUnselectedSeats() {
    const totalSeats = Array.from({ length: 39 }, (_, i) => (i + 1).toString()); // Array of seat numbers 1-39
    const selectedSeats = Object.values(choices); // Get all chosen seat numbers
    const unselectedSeats = totalSeats.filter(seat => !selectedSeats.includes(seat)); // Find unselected seats

    // Check if the unselected seats table already exists, create it if it doesn't
    let unselectedTable = document.getElementById("unselectedSeatsTable");
    if (!unselectedTable) {
        unselectedTable = document.createElement("table");
        unselectedTable.id = "unselectedSeatsTable";
        unselectedTable.innerHTML = "<tr><th>未選択の席番号</th></tr>"; // Header row
        document.getElementById("results").appendChild(unselectedTable);
    }

    // Clear existing rows (except the header row)
    unselectedTable.querySelectorAll("tr:not(:first-child)").forEach(row => row.remove());

    // Add rows for each unselected seat
    for (const seat of unselectedSeats) {
        const row = document.createElement("tr");
        const seatCell = document.createElement("td");
        seatCell.innerText = seat;
        row.appendChild(seatCell);
        unselectedTable.appendChild(row);
    }
}
