import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
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

const paperStyle = {
    marginTop: 25,
    paddingBottom: 50,
    paddingTop: 50,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
};

@connect(mapStateToProps, mapDispatchToProps)
class ABVCalculator extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            originalGravity: 1.050,
            finalGravity: 1.008,
            abv: '',
            attenuation: '',
            calories: '',
        };
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    reset = () => {
        this.setState({
            originalGravity: 1.050,
            finalGravity: 1.008,
            abv: '',
            attenuation: '',
            calories: '',
        });
    }

    _abv = (og, fg) => {
        return (og - fg) * 131.25;
    }

    _attenuation = (og, fg) => {
        return 100 * ((og - fg) / (og - 1));
    }

    _caloriesFromAlcohol = (og, fg) => {
        return 1881.22 * fg * ( ( og - fg ) / (1.775 - og ) );
    }

    _caloriesFromCarbohydrates = (og, fg) => {
        return 3550 * fg * ((0.1808 * og) + (0.8192 * fg) - 1.0004);
    }

    _totalCalories = (og, fg) => {
        return this._caloriesFromAlcohol(og, fg) + this._caloriesFromCarbohydrates(og, fg);
    }

    calculate = () => {
        let abvCalc = this._abv(this.state.originalGravity, this.state.finalGravity).toFixed(2);
        let attenuation = this._attenuation(this.state.originalGravity, this.state.finalGravity).toFixed(2);
        let calories = this._totalCalories(this.state.originalGravity, this.state.finalGravity).toFixed(0);
        this.setState({
            abv: abvCalc,
            attenuation: attenuation,
            calories: calories
        });
    }

    render () {
        return(
			<div>
            	<h1>Alcohol by Volume Calculator</h1>
            	<hr />
            	<div className="col-md-4">
					<div className="col-md-12">
    					<TextField
						  type="number"
						  value={this.state.originalGravity}
						  name="originalGravity"
						  onChange={(event) => this.handleUserInput(event)}
    					  hintText="Original Gravity"
    					  floatingLabelText="Original Gravity"
    					  floatingLabelFixed={true}
    					/>
					</div>
					<div className="col-md-12">
    					<TextField
						  type="number"
						  name="finalGravity"
						  value={this.state.finalGravity}
						  onChange={(event) => this.handleUserInput(event)}
    					  hintText="Final Gravity"
    					  floatingLabelText="Final Gravity"
    					  floatingLabelFixed={true}
    					/>
					</div>
					<div className="col-md-12">
            	    	<RaisedButton
            	    	  style={{ marginTop: 50 }}
            	    	  label="Calculate"
            	    	  onClick={(e) => this.calculate(e)}
            	    	/>
                        <RaisedButton
            	    	  style={{ marginTop: 50 }}
            	    	  label="Reset"
            	    	  onClick={this.reset}
            	    	/>
					</div>
                </div>
            	<div className="col-md-3">
                    <Paper style={paperStyle}>
                        <h4>Alcohol by Volume: </h4>
                        <h3>{this.state.abv}%</h3>
                    </Paper>
                    <Paper style={paperStyle}>
                        <h4>Apparent Attenuation: </h4>
                        <h3>{this.state.attenuation}%</h3>
                    </Paper>
                    <Paper style={paperStyle}>
                        <h4>Calories per 12 oz.: </h4>
                        <h3>{this.state.calories}</h3>
                    </Paper>
                </div>
			</div>
        );
    }
}

export default ABVCalculator;
