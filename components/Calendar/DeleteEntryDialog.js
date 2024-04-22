import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

const DeleteEntryDialog = ({ isVisible, onDismiss, onDelete }) => {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismiss}>
        <Dialog.Title>Delete Entry</Dialog.Title>
        <Dialog.Content>
          <Text>
            Are you sure you want to delete this Entry from the Database?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button
            icon="delete"
            mode="contained"
            onPress={onDelete}
            style={styles.deleteButton}
          >
            Delete
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: "#E53935",
    paddingHorizontal: 10,
    marginLeft: 20,
  },
});

export default DeleteEntryDialog;
