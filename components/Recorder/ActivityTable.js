import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, DataTable } from "react-native-paper";

const ActivityTable = ({
  activities,
  onDelete,
  onSave,
  page,
  itemsPerPage,
  setPage,
  setItemsPerPage,
}) => {
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, activities.length);

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 2 }}>Activity</DataTable.Title>
          <DataTable.Title>Category</DataTable.Title>
          <DataTable.Title numeric>Duration (min)</DataTable.Title>
        </DataTable.Header>

        {activities.slice(from, to).map((activity, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={{ flex: 2, paddingRight: 8 }}>
              {activity.activity}
            </DataTable.Cell>
            <DataTable.Cell>{activity.category}</DataTable.Cell>
            <DataTable.Cell numeric>{activity.duration}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(activities.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${activities.length}`}
          numberOfItemsPerPageList={[2, 3, 4]}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={onDelete}>
          Delete
        </Button>
        <Button mode="contained" onPress={onSave}>
          Save in DB
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 10,
  },
});

export default ActivityTable;
