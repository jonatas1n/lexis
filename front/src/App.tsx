import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchPage, BillsPage, LegislatorsPage } from "./pages";
import { Provider } from "./components/ui/provider";
import { LegislatorsModal } from "./pages/Legislators/LegislatorsModal";
import { BillsModal } from "./pages/Bills/BillsModal";
import { AppProvider } from "./hooks/context";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <AppProvider>
          <Router>
            <Container>
              <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/bills" element={<BillsPage />} />
                <Route path="/legislators" element={<LegislatorsPage />} />
              </Routes>
              <LegislatorsModal />
              <BillsModal />
            </Container>
          </Router>
        </AppProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
