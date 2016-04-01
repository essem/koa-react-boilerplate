import React from 'react';
import { connect } from 'react-redux';
import { Grid, Input, Button, Panel } from 'react-bootstrap';
import Todo from './todo';

class Todos extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    todos: React.PropTypes.array,
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
    .catch(err => {
      console.error(err);
    });
  }

  handleAdd = e => {
    e.preventDefault();

    const input = this.refs.addTodoText.getInputDOMNode();

    if (!input.value.trim()) {
      return;
    }

    fetch(`${API_HOST}/api/todos`, {
      method: 'post',
      body: JSON.stringify({ text: input.value }),
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
    .catch(err => {
      console.error(err);
    });

    input.value = '';
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
    .catch(err => {
      console.error(err);
    });
  };

  render() {
    const { todos } = this.props;

    return (
      <Grid>
        <form
          className="form-inline"
          onSubmit={this.handleAdd}
        >
          <Input
            type="text"
            ref="addTodoText"
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
