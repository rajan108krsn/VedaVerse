import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>   {/* 🔴 THIS WAS MISSING */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);



// <Provider> Redux ka gatekeeper hai
// Iske andar jitna bhi React hai, sab Redux access kar sakte hain Provider ke bina useDispatch / useSelector kabhi kaam nahi karega