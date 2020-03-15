import React from 'react'
import Helmet from 'react-helmet'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import routes from './routes'

const App = () => {
  // 解构 route
  function renderRoutes(routes, contextPath) {
    const children = []
    const renderRoute = (item, routeContextPath) => {
      let newContextPath = item.path ? `${routeContextPath}/${item.path}` : routeContextPath
      newContextPath = newContextPath.replace(/\/+/g, '/')
      // if (newContextPath.includes('xxx')) {  //判断路径是否含有xxx
      //   item = {
      //     ...item,
      //     component: () => <Redirect to='/' />,
      //     children: []
      //   }
      // }
      if (item.redirect) {
        item = {
          ...item,
          component: () => <Redirect to = {item.redirect} />,
          children: []
        }
      }
      if (item.component) {
        if (item.childRoutes) {
          const childRoutes = renderRoutes(item.childRoutes, newContextPath)
          children.push(
            <Route
              key={newContextPath}
              render={props => <item.component {...props}>{childRoutes}</item.component>}
              path={newContextPath}
            />
          )
          item.childRoutes.forEach(r => renderRoute(r, newContextPath))
        } else {
          children.push(<Route key={newContextPath} component={item.component} path={newContextPath} exact />)
        }
      }
    }
    routes.forEach(item => renderRoute(item, contextPath))
    return <Switch>{children}</Switch>
  }

  const children = renderRoutes(routes, '/')
  return (
    <BrowserRouter>
      <Helmet>
        <title>react project</title>
      </Helmet>
      {children}
    </BrowserRouter>
  )
}

export default App
