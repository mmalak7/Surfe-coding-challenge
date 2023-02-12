export const Navbar = () => {
  return (
    <div className="flex flex-col w-44 h-screen border border-r-border-primary text-center py-6 items-center">
      <h3 className="font-bold">NoteApp</h3>
      <button className="flex w-12 h-12 bg-black text-white rounded-full text-3xl align-middle justify-center mt-10 cursor-pointer">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </button>
    </div>
  );
};
