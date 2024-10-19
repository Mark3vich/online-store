import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';

function App() {
  // const theme = ThemeStores.getTheme(); className={`App ${theme ? "theme_light" : "theme_dark"}`}
  return (
    <Router>
        <div>
          <Header />
          <Routes>
            {/* <Route path="/*" element={<NotFound />} /> */}
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} /> */}
          </Routes>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
