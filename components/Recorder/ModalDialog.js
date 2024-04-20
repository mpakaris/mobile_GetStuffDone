import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

const ModalDialog = ({ isVisible, onDismiss, onAnalyze }) => {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismiss}>
        <Dialog.Title>AI Analysis</Dialog.Title>
        <Dialog.Content>
          <Text>Would you like to use AI to analyze your transcript?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={onAnalyze}>Analyze</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({});

export default ModalDialog;
