/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { clearAuthError, login } from '../../../redux-toolkit/actions/auth';
import './login.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, loginSuccess } = useSelector(
    (state) => state.authState
  );
  const validator = useRef(
    new SimpleReactValidator({ className: 'text-danger' })
  );
  const isAuthenticated = localStorage.getItem('isloggedIn') === 'true';

  const handleLogin = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      dispatch(login(email, password));
    } else {
      validator.current.showMessages();
      setEmail('');
      setPassword('');
    }
  };
  useEffect(() => {
    if (loginSuccess) {
      const { token, user } = loginSuccess.payload;
      document.cookie = `token=${token}; path=/;`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('user', JSON.stringify(user));
    }
    if (error) {
      alert(error, {
        onClose: () => {
          dispatch(clearAuthError);
        }
      });
    }
    if (isAuthenticated) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.role !== 'user') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [error, isAuthenticated, dispatch, navigate, loginSuccess]);

  return (
    <div className="container-fluid" id="LoginMainImg">
      <div className="signup-form-container mx-auto py-5">
        <form onSubmit={handleLogin}>
          <div className="row custom-table mx-auto mt-5" id="CardBackIMg1">
            <div className="col-md-12 ">
              <h1 className="text-center mt-3 font-regular-29" id="CardText">
                Log in
              </h1>
              <p className="mt-4" id="CardText" style={{ fontSize: '19px' }}>
                Do not have account?
                <Link to="/signup" className="ms-2 text-white" id="CardText">
                  Sign Up
                </Link>
              </p>
              <div className="mb-3 address-container">
                <p
                  htmlFor="email"
                  className="form-label mt-4"
                  id="CardText"
                  style={{
                    backgroundColor: 'transparent',
                    fontWeight: '500'
                  }}
                >
                  Email address
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </p>
                <input
                  value={email}
                  style={{ backgroundColor: 'white', color: 'black' }}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Email address is required"
                  className="form-control text-black"
                />
                {validator.current.message('Email', email, 'required')}
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3 address-container">
                <p
                  htmlFor="password"
                  className="form-label"
                  id="CardText"
                  style={{
                    backgroundColor: 'transparent',
                    fontWeight: '500'
                  }}
                >
                  Password
                  <span className="text-danger">
                    {' '}
                    <b>*</b>
                  </span>
                </p>
                <input
                  style={{ backgroundColor: 'white', color: 'black' }}
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  placeholder="Password is required"
                  className="form-control"
                />
                {validator.current.message('password', password, 'required')}
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn  my-3 w-25 "
                  id="Btn"
                  style={{ backgroundColor: '#bd870b', borderRadius: '30px' }}
                >
                  Submit
                </button>
              </div>

              <div className="links-container mb-4">
                <p>
                  <Link
                    to="/"
                    id="CardText"
                    style={{
                      backgroundColor: 'transparent'
                    }}
                  >
                    Continue as Guest
                  </Link>
                </p>

                <p>
                  <Link
                    to="/password/forgot"
                    id="CardText"
                    style={{
                      backgroundColor: 'transparent'
                    }}
                  >
                    {' '}
                    Forgot password?
                  </Link>
                </p>
                <p>
                  <Link
                    to="/login/otp"
                    id="CardText"
                    style={{
                      backgroundColor: 'transparent'
                    }}
                  >
                    Login with OTP
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
