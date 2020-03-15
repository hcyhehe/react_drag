import React, { Component } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import './index.less'


const getItems = count => (
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + 1}`,
    content: `this is content ${k + 1}`
  }))
)

// 重新记录数组顺序
const reorder = (list, startIndex, endIndex) => {
  console.log(list, startIndex, endIndex)
  const result = Array.from(list);
  //删除并记录 删除元素
  const [removed] = result.splice(startIndex, 1)
  //将原来的元素添加进数组
  result.splice(endIndex, 0, removed)
  return result
}

const grid = 20


// 设置样式
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 ${grid}px 0 0 `,
  background: isDragging ? "lightgreen" : "#ffffff",    // 拖拽的时候背景变化
  ...draggableStyle   // styles we need to apply on draggables
})

const getListStyle = () => ({
  background: '#ddd',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
})


class Home extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      items1: getItems(1),
      items2: getItems(5)
    }
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  onDragEnd(result) {
    if (!result.destination) {
      return
    }

    // let source = this.state['items'+result.source.droppableId.split('d')[1]][result.source.index]
    // let destination = this.state['items'+result.destination.droppableId.split('d')[1]][result.destination.index]
    // console.log(source, destination)
    
    // const items1 = reorder(
    //   this.state.items1,
    //   source,
    //   destination
    // )

    const items1 = reorder(
      this.state.items1,
      result.source.index,
      result.destination.index
    )
    console.log(items1[0])
    this.setState({
      items1
    })
  }

  showWin(index){
    console.log(index)
  }

  render() {
    return (
      <div className="main">
        <div className="leftBody">

        </div>
        <div className="rightBody">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="d1" direction="horizontal" index={0}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.items1.map((item, index) => (
                    <Draggable key={'d1-'+item.id} draggableId={'d1-'+item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          onClick={this.showWin.bind(this, 'd1-'+item.id)}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            
            <Droppable droppableId="d2" direction="horizontal" index={1}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.items2.map((item2, index2) => (
                    <Draggable key={'d2-'+item2.id} draggableId={'d2-'+item2.id} index={index2}>
                      {(provided, snapshot) => (
                        <div
                          onClick={this.showWin.bind(this, 'd2-'+item2.id)}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item2.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

          </DragDropContext>
        </div>
      </div>
    )
  }
  
}

export default Home