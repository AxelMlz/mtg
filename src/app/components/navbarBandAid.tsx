import React from 'react'

import './navbarBandAid.module.css'

export default function navbarBandAid() {
    return (
        <ul id="navbar" className="list-none">
            <li><a href="/">Home</a></li>
            <li><a href="/card/search">Search</a></li>
            <li><a href="/cards">Cards</a></li>
            <li><a href="/card/random">Random Card</a></li>
            <li><a href="about.asp">About</a></li>
        </ul>
    )
}

