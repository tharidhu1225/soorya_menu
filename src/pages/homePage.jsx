import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../compornents/hedder";

export default function HomePage() {
  const API = import.meta.env.VITE_BACKEND_URI;

  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);

  const [mealFilter, setMealFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [size, setSize] = useState("medium"); // 👈 size selector

  const fetchMenus = async () => {
    try {
      const res = await axios.get(`${API}/api/menu`);
      setMenus(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/api/category`);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMenus();
    fetchCategories();
  }, []);

  const filteredMenus = menus.filter((item) => {
    const mealMatch =
      mealFilter === "All" || item.subCategory === mealFilter;

    const categoryMatch =
      categoryFilter === "All" ||
      item.category?._id === categoryFilter;

    return mealMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-black text-white">

      <Header
        categories={categories}
        setMealFilter={setMealFilter}
        setCategoryFilter={setCategoryFilter}
        mealFilter={mealFilter}
        categoryFilter={categoryFilter}
      />

      {/* SIZE SELECTOR */}
      <div className="flex gap-2 p-4 justify-center">
        {["small", "medium", "large"].map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`px-4 py-2 rounded-lg border transition ${
              size === s
                ? "bg-yellow-500 text-black font-bold"
                : "border-white/20 text-white"
            }`}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      {/* COUNT */}
      <div className="px-4 text-yellow-400 font-bold">
        Total Items: {filteredMenus.length}
      </div>

      {/* MENU GRID */}
      <div className="grid md:grid-cols-3 gap-5 p-4">

        {filteredMenus.map((item) => {
          const priceData = item.prices?.[size];

          const original = priceData?.originalPrice || 0;
          const discounted = priceData?.discountedPrice || 0;

          const discount = item.discount || 0;

          return (
            <div
              key={item._id}
              className="bg-white/5 p-4 rounded-xl border border-white/10 hover:scale-[1.02] transition"
            >

              {/* IMAGE */}
              <img
                src={item.images?.[0]}
                className="w-full h-52 object-cover rounded-xl"
              />

              {/* TITLE */}
              <h2 className="text-xl font-bold mt-3">
                {item.title}
              </h2>

              {/* CATEGORY */}
              <p className="text-gray-400 text-sm">
                {item.subCategory} • {item.category?.Cat}
              </p>

              {/* PRICE SECTION */}
              <div className="mt-2 flex items-center gap-3">

                <p className="text-yellow-400 font-bold text-lg">
                  Rs {discounted.toFixed(2)}
                </p>

                {discount > 0 && (
                  <>
                    <p className="text-gray-500 line-through text-sm">
                      Rs {original.toFixed(2)}
                    </p>

                    <span className="text-xs bg-red-500 px-2 py-1 rounded-full">
                      -{discount}%
                    </span>
                  </>
                )}

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}