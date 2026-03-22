function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        🔐 Password Manager
      </h1>

      <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Website"
          className="w-full mb-4 p-2 rounded bg-gray-700"
        />

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-2 rounded bg-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded bg-gray-700"
        />

        <button className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded">
          Save Password
        </button>
      </div>
    </div>
  );
}

export default App;