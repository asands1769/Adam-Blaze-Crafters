import React from "react";
import './About.css';
 
const Home = () => {
    return (
        <div>
            <h1> State Parks Explorer </h1>
            <section id="about-us">
                <h2>About Us</h2>
                <p>Welcome to State Parks Explorer, your go-to web app for tracking your exploration of the beautiful State Parks in Missouri. Our platform is designed to make it easy for you to manage your "visited" and "want to visit" lists, providing a seamless experience as you embark on your outdoor adventures.</p>

                <p>Key features of State Parks Explorer include:</p>
                <ul>
                    <li>Effortlessly manage your "visited" and "want to visit" lists.</li>
                    <li>Access valuable information about each park, including location, weather updates, and details about local plants and animals.</li>
                    <li>Share your hiking experiences with a community of outdoor enthusiasts, fostering a sense of camaraderie among fellow hikers.</li>
                </ul>

                <p>Join us in celebrating the beauty of Missouri's State Parks and start your exploration journey today!</p>
            </section>

            <footer>
                <p>&copy; 2024 State Parks Explorer. All rights reserved.</p>
            </footer>
        </div>
    );
};
 
export default Home;