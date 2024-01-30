import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../contexts/user-context';
import NavbarWrapper from '../layouts/page-navbar';
import AdminMiddleware from './admin-middleware-route';
import CreateFlight from '../admin-page/create-flight-page';
import CreateHotel from '../admin-page/create-hotel-page';
import CreateAirline from '../admin-page/create-airline-page';
import ViewHotel from '../admin-page/view-hotel-page';
import HotelDetail from '../admin-page/hotel-detail-page';
import ViewFlight from '../admin-page/view-flight-page';
import FlightDetail from '../admin-page/flight-detail-page';
import ManageAccounts from '../admin-page/manage-accounts-page';
import ManagePromos from '../admin-page/manage-promos';
import Cart from '../pages/cart-page';

export default function MiddlewareRoutes() {
	const navigate = useNavigate();

	// Passing User Auth From (UserContext.tsx)
	const { isAuth } = useUserAuth();

	useEffect(() => {
		if (!isAuth()) {
			// If not auth then go to '/' (login page at routes)
			// alert('you are not authenticated')
			// navigate('/');
		}

		// --------------------------------
	}, []);

	return (
		<Routes>

			<Route path="/cart" element={<NavbarWrapper>
				<Cart></Cart>
			</NavbarWrapper>}></Route>
			{/* ADMIN */}
			<Route path="/create-flight" element={<NavbarWrapper>
				<AdminMiddleware>
					<CreateFlight></CreateFlight>
				</AdminMiddleware>
			</NavbarWrapper>}></Route>
			<Route path="/create-hotel" element={<NavbarWrapper>
				<AdminMiddleware>
					<CreateHotel></CreateHotel>
				</AdminMiddleware>
			</NavbarWrapper>}></Route>
			<Route path="/create-airline" element={<NavbarWrapper>
				<AdminMiddleware>
					<CreateAirline></CreateAirline>
				</AdminMiddleware>
			</NavbarWrapper>}></Route>
			<Route path="/view-hotel" element={<NavbarWrapper>
				<AdminMiddleware>
					<ViewHotel></ViewHotel>
				</AdminMiddleware>
			</NavbarWrapper>}></Route>
			<Route path="/view-hotel/:id" element={<NavbarWrapper>
				<AdminMiddleware>
					<HotelDetail></HotelDetail>
				</AdminMiddleware>
			</NavbarWrapper>}></Route>
			<Route path="/view_flight" element={<NavbarWrapper>
				<AdminMiddleware>
					<ViewFlight></ViewFlight>
				</AdminMiddleware>
			</NavbarWrapper>}></Route>
			<Route path="/view_flight/:id" element={<NavbarWrapper>
				<AdminMiddleware>
					<FlightDetail></FlightDetail>
				</AdminMiddleware>
			</NavbarWrapper>}></Route>
			<Route path="/manage-accounts" element={<NavbarWrapper>
				<AdminMiddleware>
					<ManageAccounts></ManageAccounts>
				</AdminMiddleware>
			</NavbarWrapper>}></Route>
			<Route path="/manage-promos" element={<NavbarWrapper>
				<AdminMiddleware>
					<ManagePromos></ManagePromos>
				</AdminMiddleware>
			</NavbarWrapper>}></Route>
		</Routes>
	);
}
	