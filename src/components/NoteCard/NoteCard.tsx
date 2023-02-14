import { DragEvent, useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { capitalizeFirstLetter } from "../../helpers/helper";
import { INoteCard } from "../../types/noteCard";
import { User } from "../../types/user";

export const NoteCard = ({
  id,
  body,
  isNew = false,
  setInfoMessage,
  notes,
  setNotes,
}: INoteCard) => {
  const [noteBody, setNodeBody] = useState(body ?? "");
  const [isChanging, setIsChanging] = useState(false);
  const [mentionUsers, setMentionUsers] = useState<User[]>([]);
  const [usingMention, setUsingMention] = useState(false);

  const saveNote = useCallback(async () => {
    if (isNew) {
      notes.shift();
      setNotes([{ id: notes.length, body: noteBody }, ...notes]);
    } else {
      const updatedNote = notes.map((el) =>
        el.id === id ? { id: el.id, body: noteBody } : el
      );
      setNotes(updatedNote);
    }

    const data = await fetch(
      `${
        isNew
          ? `${process.env.REACT_APP_API}/notes`
          : `${process.env.REACT_APP_API}/notes/${id}`
      }`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: isNew ? "POST" : "PUT",
        body: JSON.stringify({ body: noteBody }),
      }
    );

    if (data.status === 200 && isNew) {
      console.log(">> noteBody run", noteBody);
      setInfoMessage({ color: "green", info: "Note saved successfully" });
    } else if (data.status === 200 && !isNew) {
      setInfoMessage({ color: "yellow", info: "Note updated successfully" });
    } else if (data.status === 404) {
      setInfoMessage({
        color: "orange",
        info: "Something went wrong - try again!",
      });
    }
    const timeoutId = setTimeout(() => {
      setInfoMessage({
        color: "",
        info: "",
      });
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [id, isNew, noteBody, notes, setInfoMessage, setNotes]);

  useEffect(() => {
    if (isChanging) {
      const timeoutId = setTimeout(() => {
        saveNote();
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [isChanging, saveNote]);

  const hangleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNodeBody(e.target.value);
    setIsChanging(true);
  };

  const getUsers = async () => {
    const res = await fetch("https://challenge.surfe.com/users", {
      method: "GET",
    });
    const data: User[] = await res.json();
    const sortedData = data
      .sort((a, b) => a.first_name.localeCompare(b.first_name))
      .slice(0, 5);
    setMentionUsers(sortedData);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "@") {
      setUsingMention(true);
      getUsers();
    }
  };

  const handleUserClick = (user: string) => {
    const mention = `@${user}`;
    setNodeBody((prevText) => prevText.replace("@", mention));
    setUsingMention(false);
  };

  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    const email = e.dataTransfer.getData("mention");
    const text = noteBody ? `${noteBody} @${email} ` : `@${email} `;
    setNodeBody(text);
    setIsChanging(true);
  };

  const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      key={id}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className={`relative w-72 h-64 rounded-3xl p-6 ${
        isNew ? "bg-notes-green" : "bg-notes-yellow"
      }`}
    >
      <textarea
        id="note"
        value={noteBody}
        onKeyDown={handleKeyDown}
        onChange={(e) => hangleInputChange(e)}
        className="bg-transparent border-none w-full h-5/6 outline-none resize-none text-lg text-black font-semibold"
        placeholder="Start typing your note here..."
      />
      {usingMention ? (
        <div className="absolute border bg-white rounded-lg border-b-gray-500 z-50">
          <ul>
            {mentionUsers?.map((user) => {
              return (
                <li
                  className="hover:bg-gray-200 cursor-pointer p-3 flex flex-col border-"
                  key={uuidv4()}
                  onClick={() => handleUserClick(user.first_name)}
                >
                  <p className="text-sm flex gap-1">
                    <span className="font-semibold">
                      {capitalizeFirstLetter(user.first_name)}
                    </span>
                    <span className="font-semibold">
                      {capitalizeFirstLetter(user.last_name)}
                    </span>
                  </p>
                  <span className="text-xs">{user.email}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      <div className="px-6 py-4 w-full absolute left-0 bottom-0 items-center flex justify-end">
        <button className="flex rounded-full bg-black border-none w-10 h-10 justify-center items-center outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-edit-2"
          >
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
