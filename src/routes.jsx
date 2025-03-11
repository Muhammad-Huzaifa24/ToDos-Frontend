import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp"
import ToDos from "./pages/ToDos"
import NotFound from "./pages/NotFound"
import ForgotPssword from "./pages/ForgotPassword"
import App from "./App";


const AppRoutes = () => {
  const loginRoutes = ["/", "/signUp"];

  return (
    <Router>
      <Routes>
        {loginRoutes.map((path, index) => (
          <Route key={index} path={path} element={<SignUpPage />} />
        ))}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/to-dos" element={<ToDos />} />
        <Route path="/forgot-password" element={<ForgotPssword/>} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
