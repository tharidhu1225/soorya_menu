import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./compornents/hedder";
import HomePage from "./pages/homePage";
import BlockPage from "./pages/blockPage";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<BlockPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;