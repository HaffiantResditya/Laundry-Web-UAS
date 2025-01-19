import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import DataPelanggan from "./pages/DataPelanggan";
import DataLayanan from "./pages/DataLayanan";
import DataPengeluaran from "./pages/DataPengeluaran";
import DataTransaksi from "./pages/DataTransaksi";
import DataUser from "./pages/DataUser";
import Login from "./pages/auth/Login";
import HomeKasir from "./pages/HomeKasir";
import DataPelangganKasir from "./pages/DataPelangganKasir";
import DataTransaksiKasir from "./pages/DataTransaksiKasir";
import DataPengeluaranKasir from "./pages/DataPengeluaranKasir";
import DataLaporan from "./pages/DataLaporan";
import DataLaporanKasir from "./pages/DataLaporanKasir";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dash",
    element: <Home />,
  },
  {
    path: "/dash/kasir",
    element: <HomeKasir />,
  },
  {
    path: "/pelanggan",
    element: <DataPelanggan />,
  },
  {
    path: "/pelanggan/kasir",
    element: <DataPelangganKasir />,
  },
  {
    path: "/layanan",
    element: <DataLayanan />,
  },
  {
    path: "/transaksi",
    element: <DataTransaksi />,
  },
  {
    path: "/transaksi/kasir",
    element: <DataTransaksiKasir />,
  },
  {
    path: "/pengeluaran",
    element: <DataPengeluaran />,
  },
  {
    path: "/pengeluaran/kasir",
    element: <DataPengeluaranKasir />,
  },
  {
    path: "/user",
    element: <DataUser />,
  },
  {
    path: "/data-laporan",
    element: <DataLaporan />,
  },
  {
    path: "/data-laporan/kasir",
    element: <DataLaporanKasir />,
  },
]);

// Create a client
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;
