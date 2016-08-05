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
   ListView
 } from 'react-native';

import InfoData from '../LocalData/MineInfos.json';

class Mine extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(InfoData.square_list)
    };

    this.renderRow = this.renderRow.bind(this);
    this.getInfosFromApiAsync = this.getInfosFromApiAsync.bind(this);
  }

  componentDidMount(){
      this.getInfosFromApiAsync();
  }

  renderRow(rowData) {
    return (
      <Text

      >
        {rowData.name}
      </Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>


        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />

      </View>
    );
  }

  getInfosFromApiAsync() {
    fetch('http://api.budejie.com/api/api_open.php?a=square&c=topic')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("=========>", responseJson.square_list);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          dataSource: ds.cloneWithRows(responseJson.square_list),
        });
      })
      .catch((error) => {
        console.log("=========>", error);
      });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 25
  },

});

module.exports = Mine;
