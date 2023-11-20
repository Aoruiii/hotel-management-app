import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GloabalStyles from "./styles/GlobalStyles";

import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import AppLayout from "./ui/AppLayout";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <GloabalStyles />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/account" element={<Account />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/cabins" element={<Cabins />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            styles: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
          containerStyle={{
            margin: 8,
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
