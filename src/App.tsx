import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { NoteCard } from "./components/NoteCard/NoteCard";
import { INotes } from "./types/note";
import { User } from "./types/user";

const App = () => {
  const [notes, setNotes] = useState<INotes[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [infoMessage, setInfoMessage] = useState({ color: "", info: "" });

  const handleAddNote = () => {
    const newNote = [{ isNew: true }, ...notes];
    setNotes(newNote);
  };

  useEffect(() => {
    const getNotes = async () => {
      const res = await fetch(`${process.env.REACT_APP_API}/notes`, {
        method: "GET",
      });
      const data = await res.json();
      setNotes(data.reverse());
    };
    getNotes();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch(
        `https://challenge.surfe.com/users/mostMentioned`
      );
      const data = await res.json();
      setUsers(data);
    };

    getUsers();
  }, []);

  const renderInfo = useMemo(() => {
    return (
      <div
        className={`${infoMessage.color === "green" && `bg-notes-green`} ${
          infoMessage.color === "orange" && `bg-notes-orange`
        }  ${
          infoMessage.color === "yellow" && `bg-notes-yellow`
        } rounded-full w-fit px-4 py-1 ml-8`}
      >
        Note information: {infoMessage.info}
      </div>
    );
  }, [infoMessage.color, infoMessage.info]);

  return (
    <div className="flex">
      <Navbar onClick={handleAddNote} users={users} />
      <div className="m-4">
        {renderInfo}
        <div className="grid grid-cols-4 gap-8 p-8">
          {notes.map(({ id, body, isNew }) => (
            <NoteCard
              key={uuidv4()}
              id={id}
              body={body}
              isNew={isNew}
              setInfoMessage={setInfoMessage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
