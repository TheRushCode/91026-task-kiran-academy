```javascript
const form = document.getElementById("employeeForm");
const table = document.getElementById("employeeTable");

let employees = [];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("empId").value;
    const name = document.getElementById("empName").value.trim();
    const role = document.getElementById("empRole").value;
    const salary = document.getElementById("empSalary").value;

    // Check duplicate employee ID
    if (employees.some(function(emp) {
        return emp.id === id;
    })) {
        alert("Employee ID already exists!");
        return;
    }

    // Create employee object
    const employee = {
        id: id,
        name: name,
        role: role,
        salary: Number(salary)
    };

    // Add employee
    employees.push(employee);

    // Display employee data
    displayEmployees();

    // Clear form
    form.reset();
});

function displayEmployees() {
    table.innerHTML = "";

    if (employees.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 5;
        cell.textContent = "No employees added yet.";

        row.appendChild(cell);
        table.appendChild(row);
        return;
    }

    employees.forEach(function(emp, index) {
        const row = document.createElement("tr");

        const values = [
            emp.id,
            emp.name,
            emp.role,
            emp.salary.toFixed(2)
        ];

        values.forEach(function(value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        // Delete button
        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", function() {
            employees.splice(index, 1);
            displayEmployees();
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        table.appendChild(row);
    });
}
```