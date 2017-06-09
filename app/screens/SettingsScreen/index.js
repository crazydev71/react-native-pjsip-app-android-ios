import React, { Component, PropTypes } from 'react';
import {View, Text, Platform} from 'react-native'

import {connect} from 'react-redux'
import * as Navigation from '../../modules/navigation'

import ListAccountInfo from '../../components/Settings/ListAccountInfo'
import ListConfigurationInfo from '../../components/Settings/ListConfigurationInfo'
import ListSection from '../../components/Common/ListSection'
import Header from '../../components/Header'

class SettingsScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    renderAccounts(accounts) {
        let result = [];

        for (let id in accounts) {
            if (accounts.hasOwnProperty(id)) {
                let acc = accounts[id];
                result.push((
                    <ListAccountInfo key={acc.getId()} account={acc} connectivity={this.props.connectivity} onPress={this.props.onAccountPress && this.props.onAccountPress.bind(this, acc)} />
                ))
            }
        }

        if (result.length == 0) {
            return (
                <View style={{height: 56, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 16, color: "#CCC"}}>No accounts available</Text>
                </View>
            )
        }

        return result;
    }

    render() {
        let platformHeaderProps = {};

        if (Platform.OS === 'ios') {

        } else {
            platformHeaderProps['leftItem'] = {
                title: 'Menu',
                icon: require('../../assets/images/header/hamburger.png'),
                layout: 'icon',
                onPress: this.props.onHamburgerPress
            };
        }


        platformHeaderProps['rightItem'] = {
            title: 'Create',
            icon: require('../../assets/images/header/add_white.png'),
            layout: 'icon',
            onPress: this.props.onNewAccountPress
        };

        // TODO: Add icon for network and media configuration.

        return (
            <View style={{flex: 1}}>
                <Header title="Settings" {...platformHeaderProps} />

                <ListSection title="Accounts" />

                {this.renderAccounts(this.props.accounts)}

                <ListSection title="Advanced" />

                <ListConfigurationInfo onPress={this.props.onNetworkSettingsPress} title="Network" description="How application can be connected to the network" />

                <ListConfigurationInfo onPress={this.props.onMediaSettingsPress} title="Media" description="Codecs and in-call sound behaviour" />

            </View>
        );
    }

}

SettingsScreen.props = {
    accounts: PropTypes.object,
    onHamburgerPress: PropTypes.func,
    onAccountPress: PropTypes.func,
    onNewAccountPress: PropTypes.func
}

function select(store) {
    return {
        accounts: store.pjsip.accounts,
        connectivity: store.app.endpointConnectivity
    };
}

function actions(dispatch) {
    return {
        onHamburgerPress: () => {
            dispatch(Navigation.openDrawer());
        },
        onAccountPress: (account) => {
            dispatch(Navigation.goTo({name: 'account', account: account}));
        },
        onNewAccountPress: () => {
            dispatch(Navigation.goTo({name: 'account'}));
        },
        onNetworkSettingsPress: () => {
            dispatch(Navigation.goTo({name: 'network_settings'}));
        },
        onMediaSettingsPress: () => {
            dispatch(Navigation.goTo({name: 'media_settings'}));
        }
    };
}

export default connect(select, actions)(SettingsScreen);