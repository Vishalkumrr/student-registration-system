// Function to update the table with data from localStorage
function updateTable() {
    // Retrieve data from localStorage or initialize an empty string
    var data = localStorage.getItem("details") || '';

    // Reference the table body
    var tableBody = document.getElementById("dataTable").getElementsByTagName("tbody")[0];

    // Clear the table body to avoid duplicates
    tableBody.innerHTML = "";

    // Split the data into individual entries and populate the table
    var entries = data.split(';');
    entries.forEach(function(entry, index) {
        if (entry) { // Check if the entry is not empty
            var [name, schoolId, email, number] = entry.split('|');
            var row = tableBody.insertRow(); // Create a new row

            // Insert cells and populate them with data
            row.insertCell(0).textContent = name;
            row.insertCell(1).textContent = schoolId;
            row.insertCell(2).textContent = email;
            row.insertCell(3).textContent = number;

            // Create the actions cell with Edit, Save, and Delete buttons
            var actionsCell = row.insertCell(4);

            
            var editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.onclick = function() { editEntry(row, index); };
            actionsCell.appendChild(editButton);

            // Create the Save button, initially hidden, and set its click event to the saveEntry function
            var saveButton = document.createElement("button");
            saveButton.textContent = "Save";
            saveButton.style.display = "none";
            saveButton.onclick = function() { saveEntry(row, index); };
            actionsCell.appendChild(saveButton);

            // Create the Delete button and set its click event to the deleteEntry function
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = function() { deleteEntry(index); };
            actionsCell.appendChild(deleteButton);
        }
    });
}

// Function to enable editing of a table row
function editEntry(row, index) {
    // Replace the table cell content with input fields containing the current values
    row.cells[0].innerHTML = `<input type="text" value="${row.cells[0].textContent}">`;
    row.cells[1].innerHTML = `<input type="text" value="${row.cells[1].textContent}">`;
    row.cells[2].innerHTML = `<input type="text" value="${row.cells[2].textContent}">`;
    row.cells[3].innerHTML = `<input type="text" value="${row.cells[3].textContent}">`;

    
    row.cells[4].children[0].style.display = "none";  // Hide Edit button
    row.cells[4].children[1].style.display = "inline";  // Show Save button
}

// Function to save the edited row back to localStorage
function saveEntry(row, index) {
    // Get user values from the input fields
    var name = row.cells[0].children[0].value;
    var schoolId = row.cells[1].children[0].value;
    var email = row.cells[2].children[0].value;
    var number = row.cells[3].children[0].value;

    // fetching existing data from localStorage
    var data = localStorage.getItem("details") || '';
    var entries = data.split(';');

    // Update the specific entry with the new values
    entries[index] = `${name}|${schoolId}|${email}|${number}`;

    // Save the updated data to localStorage
    localStorage.setItem("details", entries.join(';') + ';');

    // Refresh table to show updated value
    updateTable();
}

// Function to delete a row from the table and localStorage
function deleteEntry(index) {
    // Retrieve existing data from localStorage
    var data = localStorage.getItem("details") || '';
    var entries = data.split(';');

    // Remove the specific entry
    entries.splice(index, 1);

    // Save the updated data back to localStorage
    localStorage.setItem("details", entries.join(';') + ';');

    // Refresh the table to show the remaining entries
    updateTable();
}
window.onload = updateTable;
