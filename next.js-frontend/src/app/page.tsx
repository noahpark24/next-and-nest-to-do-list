import List from '../views/List';
import AddTask from '@/views/AddTask';
export default function Home() {
  return (
    <>
      <div className="py-12">
        <AddTask />
      </div>
      <div className="pb-6">
        <List />
      </div>
    </>
  );
}
