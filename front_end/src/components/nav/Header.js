import React from "react";

export default function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a href='/parks'>Parks</a></li>
                    <li><a href='/weather'>Weather</a></li>
                    <li><a href='/animals'>Animals</a></li>
                    <li><a href='/plants'>Plants</a></li>
                    <li><a href='/about'>About</a></li>
                </ul>
            </nav>
        </header>
    )
}