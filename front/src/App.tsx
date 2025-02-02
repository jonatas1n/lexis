import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchPage, BillsPage, LegislatorsPage } from "./pages";
import { Provider } from "./components/ui/provider";
import { LegislatorsModal } from "./pages/Legislators/LegislatorsModal";
import { BillsModal } from "./pages/Bills/BillsModal";
import { AppProvider } from "./hooks/context";
import { AnimatePresence, motion } from "framer-motion";
// @ts-expect-error: Font source does not have type definitions
import '@fontsource-variable/outfit';

const queryClient = new QueryClient();

const pageVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { scale: 0.9, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div variants={pageVariants} {...pageVariants}>
              <SearchPage />
            </motion.div>
          }
        />
        <Route
          path="/bills"
          element={
            <motion.div variants={pageVariants} {...pageVariants}>
              <BillsPage />
            </motion.div>
          }
        />
        <Route
          path="/legislators"
          element={
            <motion.div variants={pageVariants} {...pageVariants}>
              <LegislatorsPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <AppProvider>
          <Router basename="/">
            <Container>
              <AnimatedRoutes />
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
