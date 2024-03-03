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
import TicketPage from '../pages/ticket-page';
import HistoryPage from '../pages/history-page';
import ProfilePage from '../pages/profile-page';
import CheckLocationPage from '../pages/check-location-page';
import SearchPage from '../pages/search-page';

export default function MiddlewareRoutes() {
	const navigate = useNavigate();
	const { isAuth } = useUserAuth();

	useEffect(() => {

		if (!isAuth()) {
			navigate('/');
		}
	}, []);

	return (
		<Routes>
			<Route path="/search/:query" element={<NavbarWrapper>
				<SearchPage></SearchPage>
			</NavbarWrapper>}></Route>
			<Route path="/cart" element={<NavbarWrapper>
				<Cart></Cart>
			</NavbarWrapper>}></Route>
			<Route path="/ticket" element={<NavbarWrapper>
				<TicketPage></TicketPage>
			</NavbarWrapper>}></Route>
			<Route path="/history" element={<NavbarWrapper>
				<HistoryPage></HistoryPage>
			</NavbarWrapper>}></Route>
			<Route path="/profile" element={<NavbarWrapper>
				<ProfilePage></ProfilePage>
			</NavbarWrapper>}></Route>
			<Route path="/check_location" element={<NavbarWrapper>
				<CheckLocationPage></CheckLocationPage>
			</NavbarWrapper>}></Route>

			{/* ! ADMIN */}
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
					<ViewHotel searchHotel={null}></ViewHotel>
				</AdminMiddleware>
			</NavbarWrapper>}></Route>
			<Route path="/view-hotel/:id" element={<NavbarWrapper>
				<HotelDetail></HotelDetail>
			</NavbarWrapper>}></Route>
			<Route path="/view_flight" element={<NavbarWrapper>
				<AdminMiddleware>
					<ViewFlight flightSearch={null}></ViewFlight>
				</AdminMiddleware>
			</NavbarWrapper>}></Route>
			<Route path="/view_flight/:id" element={<NavbarWrapper>
				<FlightDetail></FlightDetail>
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
	