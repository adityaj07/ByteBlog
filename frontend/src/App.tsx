import './App.css'
import { Button } from './components/ui/button'

function App() {
  const handleButtonClick = () => {
    alert("JAI SHRI RAM");
  };

  return (
    <>
      <Button onClick={handleButtonClick}>Bolo Jai Shri Ram</Button>
    </>
  )
}

export default App
