import React, { useState, useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { AuthContext } from '../context/auth'

export default function MenuBar() {
    const { user, logout } = useContext(AuthContext);
    // makes the right link active depending on pathname instead of only on click
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1);

    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, { name }) => setActiveItem(name);
    const menuBar = user ? (
        <Menu pointing secondary >
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to="/"
            />
            <Menu.Item
                name='posts'
                active={activeItem === 'posts'}
                onClick={handleItemClick}
                as={Link}
                to="/posts"
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name={user.username}
                    active
                    onClick={handleItemClick}
                    as={Link}
                    to="/dashboard"
                />
                <Menu.Item
                    name='logout'
                    onClick={logout}
                    as={Link}
                    to="/"
                />
            </Menu.Menu>
        </Menu>
    ) : (
    <Menu pointing secondary >
        <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
        />
        <Menu.Menu position='right'>
            <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to="/login"
            />
            <Menu.Item
                name='register'
                active={activeItem === 'register'}
                onClick={handleItemClick}
                as={Link}
                to="/register"
            />
        </Menu.Menu>
    </Menu>
);
    return (
        menuBar
    )
}
