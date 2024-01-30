import styled from "styled-components";
import useFetchUser from "../hooks/use-fetch-user";
import "../styles/global.scss"

type ContentLayout = {
	children: JSX.Element;
};

export default function MainLayout({ children }: ContentLayout) {
	const ColorContainer = styled.div`
		background-color: ${p => p.theme.primary};
		color: ${p => p.theme.font};
		a {
			text-decoration: none;
			color: ${p => p.theme.font};
		}
	`

	useFetchUser()
	return (
		<ColorContainer className="">
			<div className="">{children}</div>
		</ColorContainer>
	);
}
