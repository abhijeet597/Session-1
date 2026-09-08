// main.js — wires up the form and initial render

document.getElementById('add-habit-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const category = document.getElementById('category').value;
  const frequency = document.getElementById('frequency').value;

  addHabit(name, category, frequency);
  renderHabitList(getHabits());
  e.target.reset();
});

renderHabitList(getHabits());
