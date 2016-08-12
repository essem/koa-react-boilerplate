import React from 'react';
import { connect } from 'react-redux';
import { Grid, FormControl, Button, Panel } from 'react-bootstrap';
import Todo from './Todo.jsx';

class Todos extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    todos: React.PropTypes.array,
  };

  state = {
    addTodoText: '',
  };

  componentDidMount() {
    fetch(`${API_HOST}/api/todos`)
    .then(res => res.json())
    .then(j => {
      this.props.dispatch({
        type: 'INIT_TODOS',
        todos: j,
      });
    })
    .catch(() => {});
  }

  handleChangeAddTodoText = e => {
    this.setState({ addTodoText: e.target.value });
  };

  handleAdd = e => {
    e.preventDefault();

    if (!this.state.addTodoText.trim()) {
      return;
    }

    fetch(`${API_HOST}/api/todos`, {
      method: 'post',
      body: JSON.stringify({ text: this.state.addTodoText }),
    })
    .then(res => res.json())
    .then(j => {
      this.props.dispatch({
        type: 'ADD_TODO',
        id: j.id,
        text: j.text,
        completed: j.completed,
      });
    })
    .catch(() => {});

    this.setState({ addTodoText: '' });
  };

  handleToggleTodo = id => {
    fetch(`${API_HOST}/api/todos/${id}/toggle`, {
      method: 'put',
    })
    .then(() => {
      this.props.dispatch({
        type: 'TOGGLE_TODO',
        id,
      });
    })
    .catch(() => {});
  };

  render() {
    const { todos } = this.props;

    return (
      <Grid>
        <form
          className="form-inline"
          onSubmit={this.handleAdd}
        >
          <FormControl
            type="text"
            value={this.state.addTodoText}
            onChange={this.handleChangeAddTodoText}
          />
          {' '}
          <Button
            type="submit"
            bsStyle="primary"
          >
            Add
          </Button>
        </form>
        <br />
        <Panel>
        {todos.map(todo => <Todo key={todo.id} {...todo} onClick={this.handleToggleTodo} />)}
        </Panel>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
});

export default connect(mapStateToProps)(Todos);
