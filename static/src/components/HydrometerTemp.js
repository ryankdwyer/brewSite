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
class HydrometerTemperature extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            specificGravity: 1.050,
            temperature: 100,
            targetTemperature: 60,
            units: 'F',
		    output: '',
        };
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    handleChange = (event, index, value) => {
        this.setState({units: value});
    }

    reset = () => {
        this.setState({
            specificGravity: 1.050,
            temperature: 100,
            targetTemperature: 60,
		    output: '',
        });
    }

	calculate(e) {
        let measuredTemperature,
            targetTemperature;
        if (this.state.units === 'C') {
            measuredTemperature = this.convertToFahrenheit(this.state.temperature);
            targetTemperature = this.convertToFahrenheit(this.state.targetTemperature);
        } else {
		    measuredTemperature = this.state.temperature;
		    targetTemperature = this.state.targetTemperature;
        }
		let specificGravity = this.state.specificGravity;
		let cg = (specificGravity * ((1.00130346 - 0.000134722124 * measuredTemperature + 0.00000204052596 * Math.pow(measuredTemperature, 2) - 0.00000000232820948 * Math.pow(measuredTemperature, 3)) / (1.00130346 - 0.000134722124 * targetTemperature + 0.00000204052596 * Math.pow(targetTemperature, 2) - 0.00000000232820948 * Math.pow(targetTemperature, 3))));
        let cgRounded = cg.toFixed(3);
		this.setState({output: cgRounded});
	}

    convertToFahrenheit(t) {
        return (t * (9 / 5)) + 32;
    }

	disableButton(e) {
		if (this.state.specificGravity > 0 &&
			this.state.temperature > 0 &&
			this.state.targetTemperature > 0 ) {
			return false;
		}
		return true;
	}

    render() {
        return(
			<div>
            	<h1>Hydrometer Temperature Correction</h1>
            	<hr />
            	<div className="col-md-4">
			        <div className="col-md-12">
          			    <SelectField
                          floatingLabelText="Temp. Units"
                          value={this.state.units}
                          name="units"
          			      onChange={this.handleChange}>
          			      <MenuItem value={'F'} primaryText="Fahrenheit"></MenuItem>
          			      <MenuItem value={'C'} primaryText="Celsius"></MenuItem>
          			    </SelectField>
                    </div>
					<div className="col-md-12">
    					<TextField
						  type="number"
						  value={this.state.specificGravity}
						  name="specificGravity"
						  onChange={(event) => this.handleUserInput(event)}
    					  hintText="Specific Gravity"
    					  floatingLabelText="Specific Gravity"
    					  floatingLabelFixed={true}
    					/>
					</div>
					<div className="col-md-12">
    					<TextField
						  type="number"
						  name="temperature"
						  value={this.state.temperature}
						  onChange={(event) => this.handleUserInput(event)}
    					  hintText="Temperature"
    					  floatingLabelText="Temperature"
    					  floatingLabelFixed={true}
    					/>
					</div>
					<div className="col-md-12">
    					<TextField
						  type="number"
						  name="targetTemperature"
						  value={this.state.targetTemperature}
						  onChange={(event) => this.handleUserInput(event)}
    					  hintText="Target Temperature"
    					  floatingLabelText="Target Temperature"
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
                        <h4>Corrected Gravity: </h4>
                        <h3>{this.state.output}</h3>
                    </Paper>
                </div>
			</div>
        );
    }
}

export default HydrometerTemperature;
