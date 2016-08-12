import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';

export default class Home extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
  };

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">WebApp</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <li><Link to="/todos">Todos</Link></li>
            <li><Link to="/about">About</Link></li>
          </Nav>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}
