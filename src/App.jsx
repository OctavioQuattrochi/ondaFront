import React from 'react';
import Header from './Components/menu_header.jsx';
import Footer from './Components/footer.jsx';
import Team from './Components/team.jsx'; // Importa el componente Team

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Team /> {/* Aquí incluyes la pantalla "Team" */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
