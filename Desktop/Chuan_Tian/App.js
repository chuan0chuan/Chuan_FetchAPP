import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList } from 'react-native';
import GroupHeader from './GroupHeader'; 

const App = () => {
  const [items, setItems] = useState([]);
  const [collapsedGroups, setCollapsedGroups] = useState({});

  useEffect(() => {
    // Asynchronously fetch data 
    fetch("https://fetch-hiring.s3.amazonaws.com/hiring.json")
      .then(res => res.json()) 
      .then(data => {
        // First，filter out to improve processing efficiency
        const filteredData = data.filter(item => item.name && item.name.trim().length > 0);
  
        // Sort
        const sortedAndFilteredData = filteredData.sort((a, b) => {
          if (a.listId !== b.listId) {
            return a.listId - b.listId;
          } else {
            return a.name.localeCompare(b.name);
          }
        });

        // Set
        setItems(sortedAndFilteredData);
  
        // Avoid hardcoding group IDs and allow for dynamic group ID 
        const groups = new Set(filteredData.map(item => item.listId));
  
        // Initialize 
        const initialCollapsedState = {};
        groups.forEach(group => initialCollapsedState[group] = true);
        
        // Set 
        setCollapsedGroups(initialCollapsedState);
      });
  }, []); // The effect runs only once since the dependency array is empty
  
  // Define the toggleGroup function that changes the collapse/expand state of a group.
  const toggleGroup = (listId) => {
    setCollapsedGroups(prevState => ({ ...prevState, [listId]: !prevState[listId] }));
  };

  // Define the renderGroup function to render each group header and its content.
  const renderGroup = ({ item: listId }) => {
    // Filter items that belong to the current group (identified by listId).
    const groupItems = items.filter(item => item.listId === listId);
    // Take the IDs of the first two items as samples to show when the group is collapsed.
    const sampleItemIds = groupItems.slice(0, 2).map(item => item.id);
    
    return (
        <View>
            {/* Render the group header with its title and toggle state */}
            <GroupHeader
                id={listId}
                onPress={() => toggleGroup(listId)}
                itemCount={groupItems.length}
                sampleItemIds={sampleItemIds}
                isCollapsed={collapsedGroups[listId]}
            />
            {/* If the group is expanded, render the list of items in this group */}
            {!collapsedGroups[listId] && (
                <FlatList
                    data={groupItems}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                />
            )}
        </View>
    );
  };

  // Define the renderItem function to render each item within a group.
  const renderItem = ({ item }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
    </View>
  );

  // Derive the unique list of group IDs to render the headers for each group.
  const groupedIds = [...new Set(items.map(item => item.listId))];

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.mainTitle}>Fetch List</Text>
        <FlatList
            data={groupedIds}
            renderItem={renderGroup}
            keyExtractor={item => `group-${item}`}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#ffffff",
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    padding: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});

export default App;
