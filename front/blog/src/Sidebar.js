// App.js

import React from 'react';
import Sidebar from './Sidebar'; // Importa el componente Sidebar desde el archivo Sidebar.js

function App() {
  return (
    <div className="App">
      <Sidebar /> {/* Utiliza el componente Sidebar */}
      {function Sidebar() {
  return (
    <aside className="sidebar">
    <div className="logo">
      <img src="logo.png" alt="logo" />
      <h2>Oliver</h2>
    </div>
    <ul className="links">
      <h4>Main menu</h4>
      <li>
        <span className="material-symbols-outlined">dashboard</span>
        <button>Panel</button>
      </li>
      <li>
        <span className="material-symbols-outlined">show_chart</span>
        <button>Ganancias</button>
      </li>
      {/* Otros elementos del menú */}
    </ul>
  </aside>
  );
}
}
    </div>
  );
}

export default App;
