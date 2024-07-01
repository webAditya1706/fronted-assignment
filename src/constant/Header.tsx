import { LogoutUserAction } from '@/redux/actions/formAction';
import Link from 'next/link';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';

const Header: React.FC = () => {
    const { loginUserData } = useSelector(({ persistedReducer }: any) => persistedReducer.FormReducer.loginUser)
    const dispatch = useDispatch();
    console.log(loginUserData, "======loginUserData");
    const token = localStorage.getItem("assignToken")

    const handleLogout = () => {
        dispatch(LogoutUserAction() as any)
    }

    return (
        token && loginUserData && Object.keys(loginUserData).length > 0 ?
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {
                            token && loginUserData &&
                            <Nav className="ms-auto align-items-center">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                                </li>
                                {loginUserData.role === "superAdmin" && <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" href="/users">Users</Link>
                                </li>}
                                {loginUserData.role === "admin" &&
                                    <li>
                                        <Link className="dropdown-item" href={`/addproduct`}>Create Product</Link>
                                    </li>}
                                <NavDropdown title={<img src={loginUserData.logo} alt='user' className='user_img' />} id="basic-nav-dropdown">
                                    {(loginUserData.role === "user" || loginUserData.role === "admin") && (
                                        <li>
                                            <Link className="dropdown-item" href={`/updateuser/${loginUserData._id}`}>Update user</Link>
                                        </li>
                                    )}

                                    {loginUserData.role === "user" &&
                                        <div>
                                            <li>
                                                <Link className="dropdown-item" href={`/wishlist`}>Wishlist</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" href={`/cart`}>Cart</Link>
                                            </li>
                                        </div>
                                    }
                                    <li>
                                        <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                                    </li>
                                </NavDropdown>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            : ""
    )
};

export default Header;
