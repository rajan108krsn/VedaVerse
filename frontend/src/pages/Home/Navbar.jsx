import ArrowButton from "../components/ArrowButton.jsx";

import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate(); 
  const handleOnClick = () => {
    navigate("/temple");
    console.log("Clicked");
  }
  return (
    <div className="sticky top-0 z-50 text-black main-bg flex justify-between w-full h-20 px-6 py-4 border-b border-gray-200 items-center">
      <div className="flex gap-6 ml-20">
        <button className="nav-btn" >Charitra</button>
        <button className="nav-btn">Leela</button>
        <button className="nav-btn" onClick={handleOnClick}>Temples</button>
      </div>

      <div className="font-medium text-xl flex items-center">
        VedaVerse
        </div>

      <div className="flex mr-20 gap-6">
        <button className="nav-btn">About</button>
        <ArrowButton
          text="Get started"
          className="text-white"
        />
      </div>
    </div>
  );
}
export default Navbar;