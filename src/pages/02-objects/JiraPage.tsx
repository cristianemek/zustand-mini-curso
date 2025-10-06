import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores/tasks/task.store';

export const JiraPage = () => {

    const tasks = useTaskStore(state => state.tasks);

  const pendingTasks = Object.values(tasks).filter(task => task.status === 'open');
  const inProgressTasks = Object.values(tasks).filter(task => task.status === 'in-progress');
  const doneTasks = Object.values(tasks).filter(task => task.status === 'completed');

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <JiraTasks title='Pendientes' tasks={pendingTasks} status='open' />

          <JiraTasks title='Avanzando' tasks={inProgressTasks} status='in-progress' />

          <JiraTasks title='Terminadas' tasks={doneTasks} status='completed' />

      </div>

      



    </>
  );
};