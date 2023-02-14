import { User } from "../../types/user";
import { DragEvent } from "react";
import { v4 as uuidv4 } from "uuid";

interface INavbar {
  onClick: () => void;
  users: User[];
}

export const Navbar = ({ onClick, users }: INavbar) => {
  const handleDragStart = (e: DragEvent<HTMLDivElement>, email: string) => {
    e.dataTransfer.setData("mention", email);
  };

  return (
    <div className="flex flex-col w-44 h-screen border border-r-border-primary text-center py-6 items-center">
      <h3 className="font-bold">NoteApp</h3>
      <button
        onClick={onClick}
        className="flex w-12 h-12 bg-black text-white rounded-full text-3xl justify-center items-center mt-10 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#fff"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-plus"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
      <div className="flex flex-col gap-4 pt-8">
        <p className="font-semibold">Most recent:</p>
        {users.map(({ username, email }) => (
          <div
            key={uuidv4()}
            draggable
            onDragStart={(e) => handleDragStart(e, email)}
            className="cursor-pointer rounded px-3 py-1 bg-notes-purple"
          >
            @{username}
          </div>
        ))}
      </div>
    </div>
  );
};
