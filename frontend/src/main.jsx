import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);


// <Provider> Redux ka gatekeeper hai
// Iske andar jitna bhi React hai, sab Redux access kar sakte hain Provider ke bina useDispatch / useSelector kabhi kaam nahi karega