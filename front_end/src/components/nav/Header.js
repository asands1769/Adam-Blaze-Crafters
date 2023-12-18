import React from "react";
import './Header.css';

export default function Header() {
    return (
        <header>
            <nav>
                <ul className="navbar">
                    <li><a href='/'>Home</a></li>
                    <li><a href='/search'>Search</a></li>
                    <li><a href='/weather'>Weather</a></li>
                    <li><a href='/animals'>Animals</a></li>
                    <li><a href='/plants'>Plants</a></li>
                    <li><a href='/about'>About</a></li>
                </ul>
            </nav>
        </header>
    )
}