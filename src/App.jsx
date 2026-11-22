import Header from './components/Header'
import Hero from './components/Hero'
import Prices from './components/Prices'
import Booking from './components/Booking'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Prices />
        <Booking />
      </main>
      <Footer />
    </>
  )
}
