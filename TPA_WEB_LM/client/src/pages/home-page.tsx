import Carousel from "../components/home/carousel";
import { Title } from "../components/wrapper/title";
import { PrimaryBackground } from "../components/wrapper/secondary";

export default function Home() {
    return <div className="p-5">
        <div className="center">
            <Carousel/>
        </div>
        <div className="recommendation-container center mt-2 flex-col gap-2">
            <Title>Why Travel With Us?</Title>
            <PrimaryBackground className="p-2 border-radius-5">
                <p>🌍 Introducing Travelohi - Your Gateway to Seamless Adventures! 🛫🏨 Embark on a journey like never before with Travelohi, your trusted companion for flight and hotel accommodations! 🌟</p>
            </PrimaryBackground>

            <Title>🎉 Why Choose Travelohi? 🎉</Title>
            <PrimaryBackground className="p-2 border-radius-5">
                <p>✈️ Flight Finesse: Explore a vast array of flight options to your dream destinations, and Enjoy competitive prices and exclusive deals tailored just for you.</p>
            </PrimaryBackground>

            <PrimaryBackground className="p-2 border-radius-5">
                <p>🏨 Hotel Harmony: Discover a world of comfortable stays with our curated selection of hotels. From budget-friendly to luxurious, find the perfect accommodation that suits your style.</p>
            </PrimaryBackground>

            <PrimaryBackground className="p-2 border-radius-5">
                <p>🤩 Perks & Promos: Unlock special discounts and promotions available only to Travelohi users.  Enjoy loyalty rewards and exclusive perks with every booking.</p>
            </PrimaryBackground>
            <Title>🎁 Join Travelohi Today and Elevate Your Travel Experience! 🌟</Title>
        </div>
    </div>;
}
