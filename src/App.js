import TaskTimer from "./components/TaskTimer";
import "./App.css";

function App() {
  return (
    <AppLayout>
      <TaskTimer />
    </AppLayout>
  );
}

export default App;

const AppLayout = ({ children }) => {
  return <div className="AppLayout">{children}</div>;
};
