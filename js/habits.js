// habits.js — in-memory habit data (no backend yet — that comes later)

const CATEGORIES = ['Health', 'Productivity', 'Mindfulness', 'Learning', 'Other'];

let habits = [
  { id: 1, name: 'Morning run', category: 'Health', frequency: 'Daily', completedDates: ['2026-09-01', '2026-09-02'] },
  { id: 2, name: 'Read 20 pages', category: 'Learning', frequency: 'Daily', completedDates: ['2026-09-01'] },
  { id: 3, name: 'Meditate', category: 'Mindfulness', frequency: 'Daily', completedDates: [] },
{ id: 4, name: 'Weekly review', category: 'Productivity', frequency: 'Weekly', completedDates: ['2026-08-31'] },
];

let nextId = 5;

function addHabit(name, category, frequency) {
  const habit = { id: nextId++, name, category, frequency, completedDates: [] };
  habits.push(habit);
  return habit;
}

function getHabits() {
  return habits;
}
