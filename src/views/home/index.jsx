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
      items: getItems(5)
    }
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    )
    this.setState({
      items
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
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          onClick={this.showWin.bind(this, item.id)}
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
          </DragDropContext>
        </div>
      </div>
    )
  }
  
}

export default Home