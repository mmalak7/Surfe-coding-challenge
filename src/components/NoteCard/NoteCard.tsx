import React from "react";

export const NoteCard = () => {
  return (
    <div className="relative m-10 w-64 h-72 rounded-3xl p-6 bg-notes-yellow">
      <textarea
        className="bg-transparent border-none pr-6 outline-none resize-none text-lg text-black font-semibold"
        placeholder="Start typing your note here..."
      />
      <div className="p-8 w-full absolute left-0 bottom-0 items-center flex justify-between">
        <div>
          <span className="text-lg font-semibold">date goes here</span>
        </div>
        <div>
          <button className="flex rounded-full bg-black border-none w-10 h-10 cursor-pointer justify-center items-center outline-none">
            <svg
              fill="none"
              stroke="white"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
