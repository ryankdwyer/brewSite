import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import * as actionCreators from '../actions/auth';
import { GRAINS } from '../constants/index';

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
            batchSize: 5,
            grain1: {},
            grain2: {},
            grain3: {},
            pounds1: '',
            pounds2: '',
            pounds3: '',
            keys: [1, 2, 3],
            srm: '',
        };
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    handleChange = (type) => (event, index, value) => {
        let stateCopy = Object.assign({}, this.state);
        stateCopy[type] = value;
        this.setState(stateCopy);
    }

    reset = () => {
        this.setState({ 
            batchSize: 5,
            grain1: {},
            grain2: {},
            grain3: {},
            pounds1: '',
            pounds2: '',
            pounds3: '',
        });
    }

    calcMCU = (pounds, lovibond, gallons) => {
        return (pounds * lovibond) / gallons;
    }

    moreyCalc = (mcu) => {
        return 1.4922 * (Math.pow(mcu, 0.6859));
    }

    calculate = () => { 
        let tempState = Object.assign({}, this.state);
        let gallons = tempState.batchSize;
        let mcu = 0;
        this.state.keys.forEach(function(key) {
            let pounds = tempState['pounds' + key];
            let lovibond = tempState['grain' + key].lovibond;
            mcu += this.calcMCU(pounds, lovibond, gallons);
        }, this);
        let srm = this.moreyCalc(mcu);
        this.setState({srm:srm});
    }

    render () {
        return(
			<div>
            	<h1>SRM Calculator</h1>
            	<hr />
            	<div className="col-md-8">
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
						  name="pounds1"
						  value={this.state.pounds1}
						  onChange={(event) => this.handleUserInput(event)}
    					  hintText="Pounds"
    					  floatingLabelFixed={true}
    					/>
					</div>
			        <div className="col-md-6">
          			    <SelectField
                          value={this.state.grain1.grain}
                          name="units"
                          hintText="Grain"
          			      onChange={this.handleChange('grain1')}>
                          {
                              GRAINS.map(grain => {
                                return <MenuItem value={grain}>{grain.grain}</MenuItem>
                              })
                          }
          			      <MenuItem value={'C'} primaryText="Celsius"></MenuItem>
          			    </SelectField>
                    </div>
                    <div className="col-md-6">
    					<TextField
						  type="number"
						  name="pounds2"
						  value={this.state.pounds2}
						  onChange={(event) => this.handleUserInput(event)}
    					  hintText="Pounds"
    					  floatingLabelFixed={true}
    					/>
					</div>
			        <div className="col-md-6">
          			    <SelectField
                          value={this.state.grain2.grain}
                          name="units"
                          hintText="Grain"
          			      onChange={this.handleChange('grain2')}>
                          {
                              GRAINS.map(grain => {
                                  return <MenuItem value={grain}>{grain.grain}</MenuItem>
                                })
                          }
          			    </SelectField>
                    </div>
                    <div className="col-md-6">
    					<TextField
						  type="number"
						  name="pounds3"
						  value={this.state.pounds3}
						  onChange={(event) => this.handleUserInput(event)}
    					  hintText="Pounds"
    					  floatingLabelFixed={true}
    					/>
					</div>
			        <div className="col-md-6">
          			    <SelectField
                          value={this.state.grain3.grain}
                          name="units"
                          hintText="Grain"
          			      onChange={this.handleChange('grain3')}>
                          {
                              GRAINS.map(grain => {
                                  return <MenuItem value={grain}>{grain.grain}</MenuItem>
                                })
                          }
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
            	<div className="col-md-6 col-md-offset-3">
                    <Paper style={paperStyle}>
                        <h4>SRM: </h4>
                        <h3>{this.state.srm}</h3>
                    </Paper>
                    <Paper style={paperStyle}>
                        <h4>EBC: </h4>
                        <h3>{this.state.ebc}</h3>
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
