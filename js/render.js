// render.js — turns the habits array into table rows in the DOM

function renderHabitList(list) {
  const tbody = document.getElementById('habit-list-body');
  tbody.innerHTML = '';

  list.forEach((habit) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${habit.name}</td>
      <td>${habit.category}</td>
      <td>${habit.frequency}</td>
      <td>${habit.completedDates.length} check-ins</td>
    `;
    tbody.appendChild(row);
  });

  if (list.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = '<td colspan="4">No habits to show.</td>';
    tbody.appendChild(row);
  }
}
