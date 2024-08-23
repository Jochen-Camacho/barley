import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import EmployeeProfile from "./components/EmployeeProfile/EmployeeProfile";
import PayBands from "./components/Product/PayBands/PayBands";
import People from "./components/Product/People/People";
import ProductWrapper from "./components/Product/ProductWrapper";
import TotalRewards from "./components/Product/TotalRewards/TotalRewards";
import Sidebar from "./components/Nav/Sidebar/Sidebar";
import Header from "./components/Nav/Header";
import Login from "./components/LoginPage/Login";
import NotFound from "./components/NotFound";
import MobileNav from "./components/Nav/Sidebar/MobileNav";
import User from "./components/Nav/User/User";
import { useAuth } from "./hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AuthenticatedLayout = ({ children }) => (
  <div className="min-h-screen h-screen w-full flex">
    <Header>
      <div className="w-full flex md:justify-end justify-between items-center">
        <MobileNav />
        <User />
      </div>
    </Header>
    <div className="hidden md:block w-full lg:max-w-[250px] md:max-w-[200px]">
      <Sidebar />
    </div>
    <div className="flex-1">
      <ProductWrapper>{children}</ProductWrapper>
    </div>
  </div>
);

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" />
          ) : (
            <>
              <Header showAll={true}>
                <div className="text-white scroll-m-20 text-3xl font-semibold tracking-tight">
                  Barley
                </div>
              </Header>
              <Login />
            </>
          )
        }
      />

      <Route
        path="/paybands"
        element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <PayBands />
            </AuthenticatedLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/people"
        element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <People />
            </AuthenticatedLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/people/:id"
        element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <EmployeeProfile />
            </AuthenticatedLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <TotalRewards />
            </AuthenticatedLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
