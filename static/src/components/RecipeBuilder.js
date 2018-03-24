import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/auth';

function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
class RecipeBuilder extends React.Component {

    render() {
        return(
            <div className="col-md-8">
                <h1>Recipe Builder</h1>
                <hr />
            </div>
        )
    }
}

export default RecipeBuilder;
