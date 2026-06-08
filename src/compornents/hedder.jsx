import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function Header({
  categories = [],
  setMealFilter,
  setCategoryFilter,
  mealFilter,
  categoryFilter,
}) {
  const [mealOpen, setMealOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const mealRef = useRef();
  const catRef = useRef();

  const mealOptions = ["All", "Lunch", "Dinner", "Lunch & Dinner"];

  const isMealActive = (value) => mealFilter === value;
  const isCatActive = (value) => categoryFilter === value;

  // OUTSIDE CLICK CLOSE
  useEffect(() => {
    const handleClick = (e) => {
      if (mealRef.current && !mealRef.current.contains(e.target)) {
        setMealOpen(false);
      }
      if (catRef.current && !catRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectedCat =
    categories.find((c) => c._id === categoryFilter)?.Cat;

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-yellow-500/20">

      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3 px-4 py-4">

        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-yellow-500/30">
          <img
            src="/logo.jpeg"
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-xl font-bold text-yellow-400">
            Restaurant Menu
          </h1>
          <p className="text-gray-400 text-xs">
            Fresh Food • Fast Service 🍽
          </p>
        </div>

      </div>

      {/* ================= FILTERS ================= */}
      <div className="px-3 pb-4 grid grid-cols-1 md:grid-cols-2 gap-3">

        {/* ================= MEAL ================= */}
        <div ref={mealRef} className="relative">

          <button
            onClick={() => {
              setMealOpen(!mealOpen);
              setCatOpen(false);
            }}
            className="w-full flex justify-between items-center bg-white/10 px-4 py-4 rounded-xl border border-white/10"
          >
            <div className="flex flex-col text-left">
              <span className="text-xs text-gray-400">
                Meal Type
              </span>

              <span className="text-white font-semibold">
                {mealFilter && mealFilter !== "All"
                  ? mealFilter
                  : "All"}
              </span>
            </div>

            <FaChevronDown
              className={`${mealOpen ? "rotate-180" : ""} transition`}
            />
          </button>

          {mealOpen && (
            <div className="absolute w-full mt-2 bg-black/95 border border-white/10 rounded-xl overflow-hidden z-50">

              {mealOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setMealFilter(item);
                    setMealOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 transition ${
                    isMealActive(item)
                      ? "bg-yellow-500 text-black font-bold"
                      : "hover:bg-yellow-500 hover:text-black"
                  }`}
                >
                  {item}
                </button>
              ))}

            </div>
          )}
        </div>

        {/* ================= CATEGORY ================= */}
        <div ref={catRef} className="relative">

          <button
            onClick={() => {
              setCatOpen(!catOpen);
              setMealOpen(false);
            }}
            className="w-full flex justify-between items-center bg-white/10 px-4 py-4 rounded-xl border border-white/10"
          >
            <div className="flex flex-col text-left">
              <span className="text-xs text-gray-400">
                Food Category
              </span>

              <span className="text-white font-semibold">
                {categoryFilter && categoryFilter !== "all"
                  ? selectedCat || "All Categories"
                  : "All Categories"}
              </span>
            </div>

            <FaChevronDown
              className={`${catOpen ? "rotate-180" : ""} transition`}
            />
          </button>

          {catOpen && (
            <div className="absolute w-full mt-2 bg-black/95 border border-white/10 rounded-xl overflow-hidden max-h-64 overflow-y-auto z-50">

              {/* ALL */}
              <button
                onClick={() => {
                  setCategoryFilter("all");
                  setCatOpen(false);
                }}
                className={`w-full text-left px-4 py-3 ${
                  categoryFilter === "all"
                    ? "bg-yellow-500 text-black font-bold"
                    : "hover:bg-yellow-500 hover:text-black"
                }`}
              >
                All Categories
              </button>

              {/* DB CATEGORIES */}
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => {
                    setCategoryFilter(cat._id);
                    setCatOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 transition ${
                    isCatActive(cat._id)
                      ? "bg-yellow-500 text-black font-bold"
                      : "hover:bg-yellow-500 hover:text-black"
                  }`}
                >
                  {cat.Cat}
                </button>
              ))}

            </div>
          )}
        </div>

      </div>

    </header>
  );
}