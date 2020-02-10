/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions'

const Navbar = (props) => {

    const onLogoutClick = (e) => {
        e.preventDefault();
        props.clearCurrentProfile()
        props.logoutUser()
    }


    const { isAuthenticated, user } = props.auth;

    const authLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/feed">
                    评论
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                    Dashboard
                </Link>
            </li>
            <li className="nav-item">
                <a href="" className="nav-link" onClick={onLogoutClick.bind(this)}>
                    <img style={{ width: '25px', marginRight: '5px' }} className="rounded-circle" src={user.avatar} alt={user.name} /> 退出
                </a>
            </li>
        </ul>
    )

    const guestLink = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/register">
                    注册
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">
                    登录
                </Link>
            </li>
        </ul>
    )
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">在线聊天</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profiles">注册人员</Link>
                            </li>
                        </ul>

                        {isAuthenticated ? authLinks : guestLink}
                    </div>
                </div>
            </nav>
        </div>
    )

}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    clearCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
