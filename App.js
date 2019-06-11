import React, {Component} from 'react';
import {Platform, StyleSheet, Text, SafeAreaView} from 'react-native';

import DirectoryList from './app/components/DirectoryList';
import Breadcrumb from './app/components/Breadcrumb';

export default class App extends Component {

  state = {
    currentDirectory: {
      name: 'pasta 3',
      parent: {
        name: 'pasta 2',
        parent: {
          name: 'pasta 1',
          parent: {

          }
        }
      }
    },
    directoryList: [
      {name: 'pasta 1'},
      {name: 'pasta 2'},
      {name: 'pasta 3'}
    ]
  }

  render() {
    const {state} = this;
    
    return (
      <SafeAreaView style={styles.container}>
        <Breadcrumb directory={state.currentDirectory} />
        <DirectoryList directories={state.directoryList} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});
