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
class SRMCalculator extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
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
        this.setState({ });
    }

    calculate = () => { }

    render () {
        return(
			<div>
            	<h1>SRM Calculator</h1>
            	<hr />
            	<div className="col-md-4">
					<div className="col-md-12">
    					<TextField
						  type="number"
						  value={this.state.batchSize}
						  name="batchSize"
						  onChange={(event) => this.handleUserInput(event)}
    					  hintText="Batch Size (gal)"
    					  floatingLabelText="Batch Size (gal)"
    					  floatingLabelFixed={true}
    					/>
					</div>
					<div className="col-md-6">
    					<TextField
						  type="number"
						  name="poundsA"
						  value={this.state.poundsA}
						  onChange={(event) => this.handleUserInput(event)}
    					  hintText="Pounds"
    					  floatingLabelText="Pounds"
    					  floatingLabelFixed={true}
    					/>
					</div>
			        <div className="col-md-6">
          			    <SelectField
                          floatingLabelText="Grain"
                          value={this.state.grainA}
                          name="units"
          			      onChange={this.handleChange}>
          			      <MenuItem value={'C'} primaryText="Celsius"></MenuItem>
          			    </SelectField>
                    </div>
                    <div className="col-md-6">
    					<TextField
						  type="number"
						  name="poundsA"
						  value={this.state.poundsA}
						  onChange={(event) => this.handleUserInput(event)}
    					  hintText="Pounds"
    					  floatingLabelText="Pounds"
    					  floatingLabelFixed={true}
    					/>
					</div>
			        <div className="col-md-6">
          			    <SelectField
                          floatingLabelText="Grain"
                          value={this.state.grainA}
                          name="units"
          			      onChange={this.handleChange}>
          			      <MenuItem value={'C'} primaryText="Celsius"></MenuItem>
          			    </SelectField>
                    </div>
                    <div className="col-md-6">
    					<TextField
						  type="number"
						  name="poundsA"
						  value={this.state.poundsA}
						  onChange={(event) => this.handleUserInput(event)}
    					  hintText="Pounds"
    					  floatingLabelText="Pounds"
    					  floatingLabelFixed={true}
    					/>
					</div>
			        <div className="col-md-6">
          			    <SelectField
                          floatingLabelText="Grain"
                          value={this.state.grainA}
                          name="units"
          			      onChange={this.handleChange}>
          			      <MenuItem value={'C'} primaryText="Celsius"></MenuItem>
          			    </SelectField>
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
                        <h4>SRM: </h4>
                        <h3>{this.state.srm}%</h3>
                    </Paper>
                    <Paper style={paperStyle}>
                        <h4>EBC: </h4>
                        <h3>{this.state.ebc}%</h3>
                    </Paper>
                    <Paper style={paperStyle}>
                        <h4>Approximate Color:</h4>
                        <h3>{this.state.approxColor}</h3>
                    </Paper>
                </div>
			</div>
        );
    }
}

export default SRMCalculator;
