import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
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
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log("ProtectedRoute rendered", {
      isAuthenticated,
      isLoading,
      pathname: location.pathname,
    });
  }, [isAuthenticated, isLoading, location]);

  if (isLoading) {
    console.log("Auth state is loading");
    return <div>Loading...</div>; // Or a loading spinner/component
  }

  if (!isAuthenticated) {
    console.log("User is not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("User is authenticated, rendering children");
  return children;
};

const AuthenticatedLayout = ({ children }) => {
  return (
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
};

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
              <div className="absolute w-[100vw] h-screen backdrop-blur-lg bg-black/80 -z-10">
                <div
                  style={{
                    backgroundImage: "url(/assets/background.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="w-full h-full opacity-25"
                ></div>
              </div>

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
