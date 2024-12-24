import '../styles/globals.css';


export const metadata = {
  title: 'Gestión de Comercios y Usuarios',
  description: 'Frontend para la gestión de comercios y usuarios registrados.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-100">
        <header className="bg-pink-500 text-white p-4">
          {/* Aquí va un título como texto */}
          <h1 className="text-3xl font-bold">Gestión de Comercios y Usuarios</h1>
          <nav className="mt-2">
            <ul className="flex gap-4">
              <li>
                <a href="/" className="hover:underline">Inicio</a>
              </li>
              <li>
                <a href="/admin" className="hover:underline">Administración</a>
              </li>
              <li>
               {/* <a href="/commerce" className="hover:underline">Comercios</a> */}

              </li>
              <li>
                <a href="/user" className="hover:underline">Usuarios</a>
              </li>
              <li>
                <a href="/api" className="hover:underline">Documentación API</a>
              </li>
            </ul>
          </nav>
        </header>
        <main className="p-6 container mx-auto">{children}</main>
        <footer className="bg-gray-800 text-white text-center p-4">
          &copy; 2024 Gestión de Comercios y Usuarios. Todos los derechos reservados.
        </footer>
      </body>
    </html>
  );
}
