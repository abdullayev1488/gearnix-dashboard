export default function UserDropdown() {
  return (
    <div className="relative">
      <button
        className="flex items-center text-gray-700 dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img src="/img/admin.jpeg" alt="Admin" />
        </span>

        <span className="block mr-1 font-medium text-theme-sm">Elman Abdullayev</span>

      </button>
    </div>
  );
}
