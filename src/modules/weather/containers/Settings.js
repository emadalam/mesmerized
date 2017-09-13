import React, { Component } from 'react';
import List from 'react-toolbox/lib/list/List';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListCheckbox from 'react-toolbox/lib/list/ListCheckbox';
import ListItem from 'react-toolbox/lib/list/ListItem';
import RadioGroup from 'react-toolbox/lib/radio/RadioGroup';
import RadioButton from 'react-toolbox/lib/radio/RadioButton';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import { METRIC } from '../configs/constants';
import Settings from '../settings';

const REFRESH_INTERVALS = [
    { value: 30*60*1000, label: '30 mins' },
    { value: 45*60*1000, label: '45mins' },
    { value: 60*60*1000, label: '1 hr' },
    { value: 120*60*1000, label: '2 hrs' },
];

class SettingsContainer extends Component {
    state = {
        showWeather: Settings.showWeather,
        unit: Settings.unit,
        refereshInterval: Settings.refereshInterval,
    };

    handleShowChange = (value, ev) => {
        Settings.showWeather = value;
        this.setState({showWeather : value});
    };

    handleUnitChange = (value, ev) => {
        Settings.unit = value;
        this.setState({unit : value});
    };

    handleRefereshIntervalChange = (value, ev) => {
        Settings.refereshInterval = parseInt(value, 10);
        this.setState({refereshInterval : value});
    };

    render() {
        const { showWeather, unit, refereshInterval } = this.state;

        const unitsComponent = (
            <RadioGroup
                value={ unit }
                disabled={ !showWeather }
                onChange={ this.handleUnitChange } >

                <RadioButton
                    className="settings__inlineItem"
                    label="Celsius"
                    value={ METRIC.CELSIUS } />
                <RadioButton
                    className="settings__inlineItem"
                    label="Fahrenheit"
                    value={ METRIC.FAHRENHEIT } />

            </RadioGroup>
        );

        const refreshIntervalDropdown = (
            <Dropdown
                label="Refresh Interval"
                value={ refereshInterval }
                source={ REFRESH_INTERVALS }
                disabled={ !showWeather }
                onChange={ this.handleRefereshIntervalChange } />
        );

        return (
            <List selectable ripple>
                <ListSubHeader caption="Weather" />
                <ListCheckbox
                    caption="Show Weather"
                    legend="Show the weather widget."
                    checked={ showWeather }
                    onChange={ this.handleShowChange } />
                <ListItem
                    itemContent={ refreshIntervalDropdown }
                    ripple={ false }
                    selectable={ false } />
                <ListItem
                    itemContent={ unitsComponent }
                    ripple={ false }
                    selectable={ false } />
            </List>
        );
    }
}

export default SettingsContainer;
