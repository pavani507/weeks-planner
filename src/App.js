import React, { Component } from "react";
import "./App.css";
import Cards from "./Card";
import AddItem from "./AddItem";

const items = [
  {
    id: 1,
    title: "One",
    column: "ALL"
  },
  {
    id: 2,
    title: "Two",
    column: "ALL"
  },
  {
    id: 3,
    title: "three",
    column: "TODO"
  },
  {
    id: 4,
    title: "four",
    column: "TODO"
  },
  {
    id: 5,
    title: "five",
    column: "PROGRESS"
  },
  {
    id: 6,
    title: "Six",
    column: "PROGRESS"
  },
  {
    id: 7,
    title: "seven",
    column: "COMPLETED"
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: items
    };
  }
  // Add task function
  addItem = (title, description, column = "ALL") => {
    const { items } = this.state;
    var row = {
      id: items.length + 1,
      title: title,
      description: description,
      column: column
    };
    items.push(row);
    this.setState({
      items
    });
  };
  //Remove task function
  removeArrValue = itemIndex => {
    const { items } = this.state;
    const updatedValues = items.filter(item => item.id !== itemIndex);
    this.setState({ items: updatedValues });
  };
  // Update task function
  updateItemsArray = (index, newValue) => {
    const { items } = this.state;
    items.forEach((item, index) => {
      if (item.id === newValue.id) {
        items[index] = newValue;
      }
    });
    this.setState({
      items
    });
  };

  getItemMap = () => {
    const { items } = this.state;
    const itemMap = {};
    items.forEach(item => {
      if (!itemMap[item.column]) {
        itemMap[item.column] = [];
      }
      itemMap[item.column].push(item);
    });
    return itemMap;
  };

  render() {
    const itemMap = this.getItemMap();
    const columnKeys = Object.keys(itemMap);

    console.log("itemMap: ", itemMap);

    return (
      <div className="App">
        <h1 className="heading"> Weeks Planner</h1>
        <div className="container">
          {columnKeys.map(column => {
            return (
              <div className="flex-container">
                <h1>{column}</h1>
                {itemMap[column]
                  .sort((a, b) => a.id - b.id)
                  .map((item, index) => {
                    return (
                      <Cards
                        text={item.title}
                        key={index}
                        index={item.id}
                        column={item.column}
                        description={item.description}
                        addItem={this.addItem}
                        updateItemsArray={this.updateItemsArray}
                        removeArrValue={this.removeArrValue}
                        columnKeys={columnKeys}
                      />
                    );
                  })}
                {column === "ALL" && <AddItem addItem={this.addItem} />}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
