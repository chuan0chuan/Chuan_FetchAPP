import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

/**
 * GroupHeader component for displaying the header of each collapsible group.
 * @param {object} props - Props for the GroupHeader component.
 * @param {number} props.id - ID of the group.
 * @param {Function} props.onPress - Function to call when the header is pressed.
 * @param {number} props.itemCount - Total number of items in the group.
 * @param {Array} props.sampleItemIds - IDs of sample items to display when collapsed.
 * @param {boolean} props.isCollapsed - Whether the group is currently collapsed.
 */
const GroupHeader = ({ id, onPress, itemCount, sampleItemIds, isCollapsed }) => {
  // Calculate how many additional items are in the group beyond the sample items
  const additionalCount = itemCount - sampleItemIds.length;
  
  return (
    <TouchableOpacity onPress={onPress} style={styles.groupHeader}>
      <Text style={styles.groupTitle}>Group {id}</Text>
      
      {/* Right content of the header */}
      <View style={styles.headerRightContent}>
        {/* Show sample item IDs if the group is collapsed */}
        {isCollapsed && sampleItemIds.map(sid => (
          <Text key={sid} style={styles.sampleId}>{`ID: ${sid}`}</Text>
        ))}
        {/* Toggle icon showing a plus sign with remaining item count if collapsed,
            otherwise a minus sign */}
        <Text style={styles.toggleIcon}>
          {isCollapsed ? `+${additionalCount}` : '-'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Styles for the GroupHeader component
const styles = StyleSheet.create({
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sampleId: {
    fontSize: 14,
    color: "#555",
  },
  toggleIcon: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GroupHeader;
