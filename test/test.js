import chai from 'chai';
import deepFreeze from 'deep-freeze';
import todoApp from '../app/reducers';

chai.should();

describe('Reducer', function () {
  it('should handle initial state', function () {
    todoApp(undefined, {}).should.deep.equal({ todos: [] });
  });

  it('should handle INIT_TODOS', function () {
    const stateBefore = {
      todos: [],
    };

    const action = {
      type: 'INIT_TODOS',
      todos: [
        {
          id: 0,
          text: 'Learn Redux',
          completed: false,
        },
      ],
    };

    const stateAfter = {
      todos: [
        {
          id: 0,
          text: 'Learn Redux',
          completed: false,
        },
      ],
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    todoApp(stateBefore, action).should.deep.equal(stateAfter);
  });

  it('should handle ADD_TODO', function () {
    const stateBefore = {
      todos: [],
    };

    const action = {
      type: 'ADD_TODO',
      id: 0,
      text: 'Learn Redux',
      completed: false,
    };

    const stateAfter = {
      todos: [
        {
          id: 0,
          text: 'Learn Redux',
          completed: false,
        },
      ],
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    todoApp(stateBefore, action).should.deep.equal(stateAfter);
  });

  it('should handle TOGGLE_TODO', function () {
    const stateBefore = {
      todos: [
        {
          id: 0,
          text: 'Learn Redux',
          completed: false,
        },
      ],
    };

    const action = {
      type: 'TOGGLE_TODO',
      id: 0,
    };

    const stateAfter = {
      todos: [
        {
          id: 0,
          text: 'Learn Redux',
          completed: true,
        },
      ],
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    todoApp(stateBefore, action).should.deep.equal(stateAfter);
  });
});
