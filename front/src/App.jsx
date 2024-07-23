import { Box, Container } from "@chakra-ui/react"
import { Header } from "./components"
import { Route, Routes } from 'react-router-dom'
import HomePage from "./pages/HomePage"
// import HomePage from "./pages/HomePage"

const App = () => {
  return (
    <Box>
      <Container maxW="620px">
        <Header />
        <Routes>

          <Route path="/" element={<HomePage />} />
        </Routes>
      </Container>
    </Box>
  )
}

export default App
