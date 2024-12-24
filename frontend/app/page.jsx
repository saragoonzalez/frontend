"use client";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header principal */}
      <header className="text-center bg-pink-500 text-white py-8">
        <h1 className="text-4xl font-bold">IMMUNE API</h1>
        <p className="text-lg mt-2">
          Gestiona tus comercios, usuarios y administradores de forma fácil y eficiente.
        </p>
      </header>

      {/* Hero Section */}
      <section className="text-center py-12 bg-blue-100">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido a IMMUNE API</h2>
        <p className="text-gray-600 mb-8">
          Encuentra y administra comercios de manera eficiente.
        </p>
        <a
          href="/search"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
        >
          Explorar Comercios
        </a>
      </section>

      {/* Contenido principal */}
      <main className="mt-8 px-6">
        <section className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Gestiona todo desde un solo lugar</h2>
          <p>
            Explora y gestiona contenido de comercios, usuarios y administradores desde un solo lugar.
          </p>
        </section>

        {/* Tarjetas de opciones */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Comercios */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold">Comercios</h3>
            <p className="mt-2">Consulta y administra los comercios registrados.</p>
            <a
              href="/commerce"
              className="mt-4 inline-block bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              Ir a Comercios
            </a>
          </div>

          {/* Usuarios */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold">Usuarios</h3>
            <p className="mt-2">Consulta y gestiona los usuarios registrados.</p>
            <a
              href="/user"
              className="mt-4 inline-block bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              Ir a Usuarios
            </a>
          </div>

          {/* Administradores */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold">Administradores</h3>
            <p className="mt-2">Gestiona y consulta la información de los administradores.</p>
            <a
              href="/admin"
              className="mt-4 inline-block bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              Ir a Admins
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 IMMUNE API. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
