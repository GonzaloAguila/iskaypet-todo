import TabContent from '../../../../components/Tabs/TabContent';
import TasksList from './TasksList';

export default function MyTasks() {
  return (
    <TabContent label="Mis tareas">
      <TasksList />
    </TabContent>
  );
}
