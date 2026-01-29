import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreAuth } from "./features/auth/authSlice";
import AppRoutes from "./routes/AppRoutes";
import { useSelector } from "react-redux";

function App() {
  const { bootstrapping } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("🔥 restoreAuth DISPATCHED");
    dispatch(restoreAuth());
  }, [dispatch]);

  if (bootstrapping) return null;
  return <AppRoutes />;
}

export default App;
