import styles from './App.module.css'
import Navbar from './components/Navbar/Navbar'
import Home from './views/Home/Home'

function App() {

  return (
    <div>
      <h1 className={styles.titulo}>Hola Mundo!!!</h1>
      <Home/>
      <Navbar/>
    </div>
  )
}

export default App