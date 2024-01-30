import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/user-context';
import MainLayout from './layouts/layout';
import MiddlewareRoutes from './middlewares/middleware-route';
import Home from './pages/home-page';
import Login from './pages/login-page';
import GamePage from './pages/game-page';
import Test from './pages/test-page';
import NavbarWrapper from './layouts/page-navbar';
import Register from './pages/register-page';
import useFetchUser from './hooks/use-fetch-user';
import ThemeContextProvider from './contexts/theme-context';
import Hotels from './pages/hotels-page';
import Flights from './pages/flights-page';
import GameJoinPage from "./pages/game-join-page";
import Unauthorized from './components/unauthorized-component';
import ChangeContextProvider from './contexts/currency-context';

function App() {
  
  return (
    <BrowserRouter>
      <ChangeContextProvider>
      <ThemeContextProvider>
        <UserProvider>

        <MainLayout>

          <Routes>
            <Route path="/page-not-found" element={<Unauthorized/>}></Route>
            <Route path="/game" element={<GamePage/>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/test" element={<Test></Test>}></Route>

            <Route path="/hotels" element={<NavbarWrapper><Hotels></Hotels></NavbarWrapper>}></Route>
            <Route path="/" element={<NavbarWrapper><Home></Home></NavbarWrapper>}></Route>
            <Route path="/game-join" element={<NavbarWrapper><GameJoinPage></GameJoinPage></NavbarWrapper>}></Route>
            <Route path="/flights" element={<NavbarWrapper><Flights></Flights></NavbarWrapper>}></Route>

            <Route path="/home" element={<NavbarWrapper><Home></Home></NavbarWrapper>}></Route>
          
            {/* need authentication and authorization */}
            <Route
              path="/*"
              element={<MiddlewareRoutes></MiddlewareRoutes>}
            ></Route>

          </Routes>

        </MainLayout>

      </UserProvider>
      </ThemeContextProvider>
      </ChangeContextProvider>
      
    </BrowserRouter>
  );
}

export default App;
