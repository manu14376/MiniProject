import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Bookshelves from './components/Bookshelves'
import BookDetails from './components/BookDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/shelf" component={Bookshelves} />
    <ProtectedRoute exact path="/books/:id" component={BookDetails} />
    <ProtectedRoute exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
