export default function Login() {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="block px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="block px-4 py-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </main>
    );
  }
  