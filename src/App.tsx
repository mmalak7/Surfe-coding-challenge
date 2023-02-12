import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { NoteCard } from "./components/NoteCard/NoteCard";

function App() {
  return (
    <div className="flex">
      <Navbar />
      <NoteCard />
    </div>
  );
}

export default App;
