import React from 'react'

const Layout = (props) => {
    return(
        <div>
            <div>header</div>
            {props.children}
            <div>footer</div>
        </div>
    )
}
  
export default Layout