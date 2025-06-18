import "./styles/globals.css";
import { AlertProvider } from "@/app/components/alerts/AlertProvider";

export const metadata = {
  title: "Manajemen Gudang",
  description: "Aplikasi manajemen gudang PT. Hartindo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased">
        <AlertProvider>{children}</AlertProvider>
      </body>
    </html>
  );
}
