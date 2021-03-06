import React from 'react';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './column';
import './index.less'

const Container = styled.div``;

class Demo extends React.Component {
  state = {
    tasks:{
      'task-1': { id:'task-1', content:'content-1' },
      'task-2': { id:'task-2', content:'content-2' },
      'task-3': { id:'task-3', content:'content-3' },
      'task-4': { id:'task-4', content:'content-4' },
      'task-5': { id:'task-5', content:'content-5' },
    },
    columns:{
      'column-1': {
        id: 'column-1',
        title: 'Flow',
        taskIds: [],
      },
      'column-2': {
        id: 'column-2',
        title: 'choose',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5'],
      },
      // 'column-3': {
      //   id: 'column-3',
      //   title: 'Done',
      //   taskIds: [],
      // }
    },
    //sort of the columns
    columnOrder: ['column-1', 'column-2']
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
  };

  newFlow(){
    const columns = {
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Flow',
          taskIds: [],
        },
        'column-2': {
          id: 'column-2',
          title: 'choose',
          taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5'],
        }
      }
    }
    this.setState(columns)
  }

  checkFlow(){
    const columns = this.state.columns
    if(columns['column-1'].taskIds.length>0){
      columns['column-1'].taskIds = columns['column-1'].taskIds.reverse()
    }
    this.setState(columns)
  }

  render() {
    return (
      <div className="drag">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Container>
            <div className="btn btn1" onClick={this.newFlow.bind(this)}>New Flow</div>
            <div className="btn btn2" onClick={this.checkFlow.bind(this)}>Check Flow</div>
            {this.state.columnOrder.map(columnId => {
              const column = this.state.columns[columnId];
              const tasks = column.taskIds.map(
                taskId => this.state.tasks[taskId],
              );
              return <Column key={column.id} column={column} tasks={tasks} />;
            })}
          </Container>
        </DragDropContext>
      </div>
    );
  }
}

export default Demo