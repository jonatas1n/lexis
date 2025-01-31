import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'; 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchPage, BillsPage, LegislatorsPage } from "./pages";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <Router>
          <Container>
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/bills" element={<BillsPage />} />
              <Route path="/legislators" element={<LegislatorsPage />} />
            </Routes>
          </Container>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;