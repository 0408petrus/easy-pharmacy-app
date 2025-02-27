import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import DrugList from "./pages/DrugList";
import Drug from "./pages/Drug";
import { ChartProvider } from "./context/ChartContext";
import ChartList from "./pages/ChartList";

export default function App() {
  return (
    <ChartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<DrugList />} />
            <Route path="/drugs/:id" element={<Drug />} />
            <Route path="/chart" element={<ChartList />} />
          </Route>

          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ChartProvider>
  );
}