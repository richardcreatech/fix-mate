import Header from "./components/Header"
import Explore from "./pages/Explore"
import Hero from "./pages/Hero"
import Metrics from "./pages/Metrics"

function App() {
  return (
    <>
      <Header/>
      <main id="my_landing_page">
        <Hero />
        <Explore />
        <Metrics />
    </main>
    </>
  )
}

export default App