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
   ListView,
   Image,
   PixelRatio
 } from 'react-native';

import InfoData from '../LocalData/MineInfos.json';
import Dimensions from 'Dimensions';
var {width , height} = Dimensions.get("window");
var clos = 5 ;
var cellWH = 75  ;
var marginL = (width - cellWH * clos) / (clos + 1) - 6;

class Mine extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };

    this.renderRow = this.renderRow.bind(this);
    this.getInfosFromApiAsync = this.getInfosFromApiAsync.bind(this);
  }

  componentDidMount(){
      this.getInfosFromApiAsync();
  }

  renderRow(rowData) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', width: cellWH , height: cellWH, borderLeftWidth: 1/PixelRatio.get(), borderLeftColor: '#dddddd', borderTopWidth: 1/PixelRatio.get(), borderTopColor: '#dddddd'}}>
          <Image source={{uri: rowData.icon}} style={{width: 38 , height: 38, marginBottom: 5}}/>
          <Text>{rowData.name}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>


        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          contentContainerStyle={styles.contentViewStyle}
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
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25
  },

  contentViewStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width,
    marginTop: 10,
    marginLeft: marginL
  },

});

module.exports = Mine;
