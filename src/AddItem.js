import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.text,
      description: props.description,
      column: props.column
    };
  }

  change = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { index, isEdit, addItem, updateItemsArray } = this.props;
    const { title, description, column } = this.state;
    if (isEdit) {
      updateItemsArray(index, {
        id: index,
        title,
        description,
        column
      });
    } else {
      addItem(title, description, column);
    }
    this.setState({
      title: "",
      description: ""
    });
  };
  render() {
    const { columnKeys = [], isEdit } = this.props;
    return (
      <form
        className="add-container"
        noValidate
        autoComplete="off"
        onSubmit={e => {
          this.handleSubmit(e);
        }}
      >
        <Card className="card">
          <CardContent>
            <TextField
              label="title"
              className="textField"
              margin="normal"
              variant="outlined"
              value={this.state.title}
              onChange={e => this.change(e)}
              id="title"
              name="title"
              type="text"
            />
            <TextField
              label="description"
              className="textField"
              margin="normal"
              variant="outlined"
              value={this.state.description}
              onChange={e => this.change(e)}
              id="description"
              name="description"
              type="text"
            />
            {columnKeys && Array.isArray(columnKeys) && columnKeys.length > 0 && (
              <React.Fragment>
                <InputLabel htmlFor="column-simple">Column</InputLabel>
                <Select
                  value={this.state.column}
                  onChange={this.change}
                  inputProps={{
                    name: "column",
                    id: "column-simple"
                  }}
                >
                  {columnKeys.map(column => {
                    return <MenuItem value={column}>{column}</MenuItem>;
                  })}
                </Select>
              </React.Fragment>
            )}
          </CardContent>
          <CardActions>
            <Button size="small" type="submit">
              {`${isEdit ? "Edit" : "Add"} Task`}
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  }
}

export default AddItem;
