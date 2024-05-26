import { NavLink, useNavigate } from "react-router-dom";
import "./style.css";
import { useDispatch,useSelector } from "react-redux";
import { Menu, Dropdown } from 'antd';
import {
  UserOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { setLogout } from "../../redux/reducers/auth";


const menuItems = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: <NavLink to={"/login"}>Login</NavLink>,
  },
  {
    key: '2',
    icon: <UserAddOutlined />,
    label: <NavLink to={"/register"}>Register</NavLink>,
  },
];

const menu = (
  <Menu items={menuItems} />
);

const Navbar = () => {
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: localStorage.getItem("token"),
      isLoggedIn: state.auth.isLoggedIn
    };
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();



const handleLogout = () => {
    dispatch(setLogout());
    localStorage.clear();
    navigate('/');
  };

  return (
    <div id="Navcon">
    <nav className="navBBar navbar navbar-expand-lg navbar-dark bg-dark">
    <img  type="image/png" src="http://res.cloudinary.com/dpsgompln/image/upload/v1716687582/yulrgau9rb4g4w926fmt.png"  />
      <button className=" navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navBar_center_texts collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" exact to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/shop">Shop</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/about">About</NavLink>
          </li>
        </ul>
      </div>
      <div className="navBar_logos navbar-nav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
              </svg>
            </NavLink>
          </li>
          { token? <li className="nav-item">
          <button className="btn btn-outline-light ml-2" onClick={handleLogout}>Logout</button>
        </li>   :
          <li className="nav-item">
            <Dropdown overlay={menu} trigger={['click']}>
              <NavLink className="nav-link" activeClassName="active" to="#" onClick={e => e.preventDefault()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
              </NavLink>
            </Dropdown>
          </li> }
        </ul>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
