import {SecondaryColor} from "../components/wrapper/secondary";
import Button from "../components/wrapper/button";
import { Title } from '../components/wrapper/title';



function GameJoinPage() {
	console.log('here');

	const clickHandle = () => {
		console.log('herekj');
		window.location.href = '/game'	
	}
	return (
		<div className='p-5 center'>
			<SecondaryColor className={'p-3'}>
				<p >
					<Button className='center' >
						<Title onClick={() => { 
							window.location.href = '/game'
						}}>JOIN GAME</Title>
					</Button>
				</p>
			</SecondaryColor>
		</div>
	);
}

export default GameJoinPage;
