/* jshint esversion: 6 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Image
 } from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Home from './Home.js';
import More from './More.js';
import Mine from './Mine';

class Main extends Component {

  constructor(props){
    super(props);
    this.state ={
      selectedTab: 'home'
    };
  }

  render() {
    return (
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="首页"
            // renderIcon={() => <Image source={{uri: 'icon_tabbar_homepage'}} style={styles.itemIconStyle} />}
            renderSelectedIcon={() => <Image source={{uri: 'icon_tabbar_homepage_selected'}} style={styles.itemIconStyle} />}
            onPress={() => this.setState({ selectedTab: 'home' })}>
            <Home />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'more'}
            title="更多"
            renderIcon={() => <Image source={{uri: 'icon_tabbar_merchant_normal'}} style={styles.itemIconStyle} />}
            renderSelectedIcon={() => <Image source={{uri: 'icon_tabbar_merchant_selected'}} style={styles.itemIconStyle} />}
            onPress={() => this.setState({ selectedTab: 'more' })}>
            <More />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'mine'}
            title="我的"
            renderIcon={() => <Image source={{uri: 'icon_tabbar_mine'}} style={styles.itemIconStyle} />}
            renderSelectedIcon={() => <Image source={{uri: 'icon_tabbar_mine_selected'}} style={styles.itemIconStyle} />}
            badgeText="1"
            onPress={() => this.setState({ selectedTab: 'mine' })}>
            <Mine />
          </TabNavigator.Item>
        </TabNavigator>

    );
  }
}

const styles = StyleSheet.create({
  itemIconStyle: {
    width: 25,
    height: 25
  }

});

module.exports = Main;
