import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentProfile, deleteAccout } from '../../actions/profileActions'
import PropTypes from 'prop-types'
import Spinner from '../../common/Spinner'
import ProfileActives from './ProfileActives'
import Experience from './Experience'
import Education from './Education'

class Dashboard extends Component {

    componentDidMount() {
        this.props.getCurrentProfile()
    }

    onDeleteClick(e) {
        this.props.deleteAccout()
    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;
        if (profile === null || loading) {
            dashboardContent = <Spinner />
        } else {
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                        </p>
                        <ProfileActives />

                        {/* 教育经历跟个人履历 */}
                        <Experience experience={profile.experience} />

                        <Education education={profile.education} />

                        {/* 删除账户按钮 */}
                        <div style={{ marginBottom: '60px' }} />
                        <button
                            onClick={this.onDeleteClick.bind(this)}
                            className="btn btn-danger"
                        >删除当前账户</button>
                    </div>
                )
            } else {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">{user.name}</p>
                        <p>没有任何相关个人信息，请添加一些个人信息</p>
                        <Link className="bn btn-lg btn-info" to='/create-profile'>创建个人信息</Link>
                    </div>
                )
            }
        }

        return (
            <div className='dashboard'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="display-4">Dashboard</div>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccout: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, { getCurrentProfile, deleteAccout })(Dashboard)