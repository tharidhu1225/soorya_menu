import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../compornents/hedder";
import LoadingScreen from "../compornents/loadingEffect";

export default function HomePage() {
  const API = import.meta.env.VITE_BACKEND_URI;

  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mealFilter, setMealFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [selectedSizes, setSelectedSizes] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [menuRes, categoryRes] = await Promise.all([
          axios.get(`${API}/api/menu`),
          axios.get(`${API}/api/category`),
        ]);

        setMenus(menuRes.data);
        setCategories(categoryRes.data);
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    };

    loadData();
  }, [API]);

  const filteredMenus = menus.filter((item) => {
    const mealMatch =
      mealFilter === "All" || item.subCategory === mealFilter;

    const categoryMatch =
      categoryFilter === "All" ||
      item.category?._id === categoryFilter;

    return mealMatch && categoryMatch;
  });

  const specialMenus = menus.filter((item) => item.isSpecial);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-black text-white">

      <Header
        categories={categories}
        setMealFilter={setMealFilter}
        setCategoryFilter={setCategoryFilter}
        mealFilter={mealFilter}
        categoryFilter={categoryFilter}
      />

      {/* COUNT */}
      <div className="px-4 py-3 text-yellow-400 font-bold text-lg">
        Total Items: {filteredMenus.length}
      </div>

      

      {/* MENU GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
        {filteredMenus.map((item) => {
          const currentSize =
            selectedSizes[item._id] || "medium";

          const priceData =
            item.prices?.[currentSize] || {};

          const original =
            priceData.originalPrice || 0;

          const discounted =
            priceData.discountedPrice || 0;

          const discount =
            item.discount ||
            (original > 0
              ? Math.round(
                  ((original - discounted) / original) *
                    100
                )
              : 0);

          return (
            <div
              key={item._id}
              className={`relative p-4 rounded-xl transition duration-300 hover:scale-[1.02] ${
                item.isSpecial
                  ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.35)]"
                  : "bg-white/5 border border-white/10"
              }`}
            >

              {/* SPECIAL BADGE */}
              {item.isSpecial && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    ⭐ SPECIAL
                  </span>
                </div>
              )}

              {/* IMAGE */}
              <img
                src={item.images?.[0]}
                alt={item.title}
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

              {/* SIZE SELECTOR */}
              <div className="flex gap-2 mt-4">
                {["small", "medium", "large"].map((s) => (
                  <button
                    key={s}
                    onClick={() =>
                      setSelectedSizes((prev) => ({
                        ...prev,
                        [item._id]: s,
                      }))
                    }
                    className={`px-3 py-1 text-xs rounded-full transition ${
                      currentSize === s
                        ? "bg-yellow-500 text-black font-bold"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* PRICE */}
              <div className="mt-4 flex items-center gap-3 flex-wrap">
                <p
                  className={`font-bold text-xl ${
                    item.isSpecial
                      ? "text-yellow-300"
                      : "text-yellow-400"
                  }`}
                >
                  Rs {discounted.toFixed(2)}
                </p>

                {discount > 0 && (
                  <>
                    <p className="text-gray-500 line-through text-sm">
                      Rs {original.toFixed(2)}
                    </p>

                    <span className="text-xs bg-red-500 px-2 py-1 rounded-full font-semibold">
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