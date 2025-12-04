import "./globals.css";

export const metadata = {
  title: "Ani Hambardzumian Studios",
  description: "Photo & video studio pavilions in Yerevan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
