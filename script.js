const form = document.getElementById("employeeForm");
const table = document.getElementById("employeeTable");

let employees = [];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("empId").value.trim();
    const name = document.getElementById("empName").value.trim();
    const role = document.getElementById("empRole").value;
    const salary = document.getElementById("empSalary").value;

    if (!id || !name || !role || salary === "") {
        alert("Please fill in all fields!");
        return;
    }

    if (employees.some(emp => emp.id === id)) {
        alert("Employee ID already exists!");
        return;
    }

    const employee = {
        id: id,
        name: name,
        role: role,
        salary: Number(salary)
    };

    employees.push(employee);

    displayEmployees();
    form.reset();
});

function displayEmployees() {
    table.innerHTML = "";

    employees.forEach(function(emp, index) {
        const row = document.createElement("tr");

        [emp.id, emp.name, emp.role, emp.salary.toFixed(2)]
            .forEach(function(value) {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.type = "button";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            employees.splice(index, 1);
            displayEmployees();
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        table.appendChild(row);
    });
}