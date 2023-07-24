import { AuthProvider } from './context/AuthContext';
import './App.css'
import {Route, Routes} from "react-router-dom";
import {PrivateRoute} from "./common/PrivateRoute";
import {RegisterPage} from "./pages/RegisterPage";
import {LoginPage} from "./pages/LoginPage";
import {ReportsPage} from "./pages/ReportsPage";
import {StudentsReportsPage} from "./pages/StudentsReportsPage";
import {GroupsReportsPage} from "./pages/GroupsReportsPage";
import {MainLayout} from "./common/layouts/Main";

function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<ReportsPage />} />
              <Route path={"/students"} element={<StudentsReportsPage />} />
              <Route path={"/groups"} element={<GroupsReportsPage />} />
              <Route path="*" element={<h1>404</h1>} />
            </Route>
          </Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
