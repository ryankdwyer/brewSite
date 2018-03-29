/* eslint new-cap: 0 */

import React from 'react';
import { Route } from 'react-router';

/* containers */
import { App } from './containers/App';
import { HomeContainer } from './containers/HomeContainer';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import ProtectedView from './components/ProtectedView';
import Recipes from './components/Recipes';
import RecipeBuilder from './components/RecipeBuilder';
import HydrometerTemperature from './components/HydrometerTemp';
import ABVCalculator from './components/ABV';
import SRMCalculator from './components/SRMCalculator';
import NotFound from './components/NotFound';

import { DetermineAuth } from './components/DetermineAuth';
import { requireAuthentication } from './components/AuthenticatedComponent';
import { requireNoAuthentication } from './components/notAuthenticatedComponent';

export default (
    <Route path="/" component={App}>
        <Route path="main" component={requireAuthentication(ProtectedView)} />
        <Route path="login" component={requireNoAuthentication(LoginView)} />
        <Route path="register" component={requireNoAuthentication(RegisterView)} />
        <Route path="home" component={requireNoAuthentication(HomeContainer)} />
        <Route path="recipes" component={requireAuthentication(Recipes)} />
        <Route path="recipe_builder" component={requireAuthentication(RecipeBuilder)} />
        <Route path="hydrometer_temp" component={requireAuthentication(HydrometerTemperature)} />
        <Route path="abv" component={requireAuthentication(ABVCalculator)} />
        <Route path="srm" component={requireAuthentication(SRMCalculator)} />
        <Route path="*" component={DetermineAuth(NotFound)} />
    </Route>
);
