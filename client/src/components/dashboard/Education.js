import React from 'react'
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { deleteEducation } from '../../actions/profileActions';

const Education =(props) => {
    const onDeleteClick =(id)=> {
        props.deleteEducation(id);
    }
    
        const education = props.education.map(exp => (
            <tr key={exp._id}>
                <td>{exp.school}</td>
                <td>{exp.degree}</td>
                <td>
                    {exp.from} 至 {exp.to === '' ? '至今' : exp.to}
                </td>
                <td>
                    <button
                        onClick={onDeleteClick.bind(this, exp._id)}
                        className="btn btn-danger"
                    >
                        删除
          </button>
                </td>
            </tr>
        ));

        return (
            <div>
                <h4 className="mb-4">教育经历</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>学校</th>
                            <th>学历</th>
                            <th>年份</th>
                            <th />
                        </tr>
                        {education}
                    </thead>
                </table>
            </div>
        )
    
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education);
