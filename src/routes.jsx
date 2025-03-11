import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp"
import ToDos from "./pages/ToDos"
import NotFound from "./pages/NotFound"
import ForgotPssword from "./pages/ForgotPassword"
import App from "./App";
import ProtectedRoute from "./routes/protected.routes"


const AppRoutes = () => {
  const loginRoutes = ["/", "/signUp"];

  return (
    <Router>
      <Routes>
        {loginRoutes.map((path, index) => (
          <Route key={index} path={path} element={<SignUpPage />} />
        ))}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPssword/>} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/to-dos" element={<ToDos />} />
        </Route>

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
