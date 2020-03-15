import React, { Component } from 'React'
import './index.less'

class ComLi extends Component {
    constructor(props){
        super(props)  //this指向父类
        this.handleClick = this.handleClick.bind(this)
    }
    render(){
        const { content } = this.props
        return(
            <div onClick={this.handleClick}>
                {content}
            </div>
        )
    }

    handleClick(){
        const { deleteItem, index } = this.props
        deleteItem(index)
    }
}

export default ComLi