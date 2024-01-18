import React from "react";
import './Header.css';
import { useAuth0 } from '@auth0/auth0-react';

export default function Header() {
    const { isAuthenticated } = useAuth0();
    return (
        <header>
            <nav>
                <ul className="navbar">
                    <li><a href='/'>Home</a></li>
                    <li><a href='/about'>About</a></li>
                    <li><a href='/weather'>Weather</a></li>
                    <li><a href='/animals'>Animals</a></li>
                    <li><a href='/plants'>Plants</a></li>
                    <li><a href='http://discourse-trailblazer-forum.social' target="_blank">Forum</a></li>
                    {isAuthenticated && (
                        <>
                            <li><a  className="t-decoration" href='/trip'>Your Trips</a></li>
                            <li><a className="t-decoration" href='/profile'>Profile</a></li>
                        </>
                    )}
                    
                </ul>
            </nav>
        </header>
    )
}