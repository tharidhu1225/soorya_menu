import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/homePage";
import Footer from "./pages/footer";

function App() {
return ( <BrowserRouter> <Toaster position="top-right" />


  <div className="min-h-screen flex flex-col bg-black">
    <div className="flex-1">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>

    <Footer />
  </div>
</BrowserRouter>

);
}

export default App;
