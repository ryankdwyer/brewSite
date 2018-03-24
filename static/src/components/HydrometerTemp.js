import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
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

const style = {
    marginTop: 50,
    paddingBottom: 50,
    paddingTop: 25,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
};


@connect(mapStateToProps, mapDispatchToProps)
class HydrometerTemperature extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            specificGravity: 0.000,
            temperature: 0,
            targetTemperature: 0,
            units: 'F',
		    output: 0,
			disabled: true,
        };
    }

    handleUserInput(e) {
		console.log(e);
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

	calculate(e) {
		let measuredTemperature = this.state.temperature;
		let specificGravity = this.state.specificGravity;
		let targetTemperature = this.state.targetTemperature;
		let cg = (specificGravity * ((1.00130346 - 0.000134722124 * measuredTemperature + 0.00000204052596 * Math.pow(measuredTemperature, 2) - 0.00000000232820948 * Math.pow(measuredTemperature, 3)) / (1.00130346 - 0.000134722124 * targetTemperature + 0.00000204052596 * Math.pow(targetTemperature, 2) - 0.00000000232820948 * Math.pow(targetTemperature, 3))));
		this.setState({output: cg});
		console.log(this.state);
		console.log(cg);
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
            	<div className="col-md-6 col-md-offset-3">
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
            	    	  label="Submit"
            	    	  onClick={(e) => this.calculate(e)}
            	    	/>
					</div>
            	</div>
			</div>
        );
    }
}

export default HydrometerTemperature;
