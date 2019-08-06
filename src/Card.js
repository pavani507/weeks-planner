import React from "react";
import AddItem from "./AddItem";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class Cards extends React.Component {
  state = {
    isEdit: false
  };

  onEditClick = () => {
    this.setState({ isEdit: true });
  };

  updateItems = (index, item) => {
    const { updateItemsArray } = this.props;
    updateItemsArray(index, item);
    this.setState({ isEdit: false });
  };

  render() {
    const { text, index, removeArrValue } = this.props;
    const { isEdit } = this.state;

    if (isEdit) {
      return (
        <AddItem isEdit {...this.props} updateItemsArray={this.updateItems} />
      );
    }

    return (
      <Card className="card">
        <CardContent>
          <Typography className="title-card" color="textSecondary" gutterBottom>
            {text}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={this.onEditClick}>
            edit
          </Button>
          <Button size="small" onClick={() => removeArrValue(index)}>
            remove
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default Cards;
