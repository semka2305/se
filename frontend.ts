import React, { useState } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  // Pobierz zadania z API
  useEffect(() => {
    fetch('/api/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  // Dodaj nowe zadanie
  const addTask = (newTask) => {
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => setTasks([...tasks, data]));
  };

  // Edytuj zadanie
  const editTask = (task) => {
    fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      });
  };

  // Usuń zadanie
  const deleteTask = (id) => {
    fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => setTasks(tasks.filter((task) => task.id !== id)));
  };

  return (
    <div>
      <h1>Lista zadań</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} ({task.priority})
            <button onClick={() => editTask(task)}>Edytuj</button>
            <button onClick={() => deleteTask(task.id)}>Usuń</button>
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => {
        e.preventDefault();
        const newTask = {
          title: e.target.elements.title.value,
          priority: e.target.elements.priority.value,
          deadline: e.target.elements.deadline.value,
        };
        addTask(newTask);
      }}>
        <input type="text" name="title" placeholder="Tytuł" />
        <input type="number" name="priority" placeholder="Priorytet" />
        <input type="date" name="deadline" placeholder="Termin" />
        <button type="submit">Dodaj zadanie</button>
      </form>
    </div>
  );
}

export default TaskList;
