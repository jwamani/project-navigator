import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/NotFound.tsx";
import { LibraryProvider } from "@/store/library-store";
import { AppLayout } from "@/components/AppLayout";
import { PublicLayout } from "@/components/PublicLayout";
import { RequireRole } from "@/components/RequireRole";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Catalogue from "./pages/Catalogue";
import BookDetails from "./pages/BookDetails";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/Dashboard";
import UsersPage from "./pages/admin/UsersPage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import Reports from "./pages/admin/Reports";
import LibrarianDashboard from "./pages/librarian/Dashboard";
import MemberDashboard from "./pages/member/Dashboard";
import MyBorrows from "./pages/member/MyBorrows";
import MyReservations from "./pages/member/MyReservations";
import CreateReservation from "./pages/member/CreateReservation";
import BooksPage from "./pages/shared/BooksPage";
import BorrowsPage from "./pages/shared/BorrowsPage";
import ReservationsPage from "./pages/shared/ReservationsPage";
import OverduePage from "./pages/shared/OverduePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LibraryProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/catalogue/:id" element={<BookDetails />} />
            </Route>

            {/* Auth (no layout) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Authenticated app */}
            <Route element={<AppLayout />}>
              <Route path="/profile" element={<Profile />} />

              {/* Admin */}
              <Route path="/admin" element={<RequireRole role="admin"><AdminDashboard /></RequireRole>} />
              <Route path="/admin/users" element={<RequireRole role="admin"><UsersPage /></RequireRole>} />
              <Route path="/admin/books" element={<RequireRole role="admin"><BooksPage allowDelete /></RequireRole>} />
              <Route path="/admin/categories" element={<RequireRole role="admin"><CategoriesPage /></RequireRole>} />
              <Route path="/admin/borrows" element={<RequireRole role="admin"><BorrowsPage /></RequireRole>} />
              <Route path="/admin/reservations" element={<RequireRole role="admin"><ReservationsPage /></RequireRole>} />
              <Route path="/admin/overdue" element={<RequireRole role="admin"><OverduePage /></RequireRole>} />
              <Route path="/admin/reports" element={<RequireRole role="admin"><Reports /></RequireRole>} />

              {/* Librarian */}
              <Route path="/librarian" element={<RequireRole role="librarian"><LibrarianDashboard /></RequireRole>} />
              <Route path="/librarian/books" element={<RequireRole role="librarian"><BooksPage /></RequireRole>} />
              <Route path="/librarian/borrows" element={<RequireRole role="librarian"><BorrowsPage /></RequireRole>} />
              <Route path="/librarian/reservations" element={<RequireRole role="librarian"><ReservationsPage /></RequireRole>} />
              <Route path="/librarian/overdue" element={<RequireRole role="librarian"><OverduePage /></RequireRole>} />

              {/* Member */}
              <Route path="/member" element={<RequireRole role="member"><MemberDashboard /></RequireRole>} />
              <Route path="/member/catalogue" element={<RequireRole role="member"><Catalogue /></RequireRole>} />
              <Route path="/member/borrows" element={<RequireRole role="member"><MyBorrows /></RequireRole>} />
              <Route path="/member/reservations" element={<RequireRole role="member"><MyReservations /></RequireRole>} />
              <Route path="/member/reservations/new" element={<RequireRole role="member"><CreateReservation /></RequireRole>} />
            </Route>

            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LibraryProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
