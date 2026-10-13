
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminPanel from "./pages/AdminPanel";
import Home from "./pages/Home";
import About from "./pages/About";
import ResourcesPage from "./pages/ResourcesPage";
import EventsPage from "./pages/EventsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddResource from "./pages/AddResource";
import AddEvent from "./pages/AddEvent";
import AddAnnouncement from "./pages/AddAnnouncement";

import Announcements from "./components/Announcements";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* ================= PUBLIC PAGES ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/resources"
          element={<ResourcesPage />}
        />

        <Route
          path="/events"
          element={<EventsPage />}
        />

        <Route
          path="/announcements"
          element={<Announcements />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ================= LOGGED-IN USERS ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* ================= FACULTY + ADMIN ================= */}

        <Route
          path="/add-resource"
          element={
            <ProtectedRoute
              allowedRoles={["faculty", "admin"]}
            >
              <AddResource />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-event"
          element={
            <ProtectedRoute
              allowedRoles={["faculty", "admin"]}
            >
              <AddEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-announcement"
          element={
            <ProtectedRoute
              allowedRoles={["faculty", "admin"]}
            >
              <AddAnnouncement />
            </ProtectedRoute>
          }
        />


        {/* ================= ADMIN ONLY ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <AdminPanel />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;
