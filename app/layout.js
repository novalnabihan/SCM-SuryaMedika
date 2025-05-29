import './styles/globals.css';

export const metadata = {
  title: "Manajemen Gudang",
  description: "Aplikasi manajemen gudang PT. Hartindo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
