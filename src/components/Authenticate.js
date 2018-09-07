// import React from 'react';
// import {connect} from 'react-redux';

// const ProtectedRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     props.user === true ?
//       <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//   )} />
// );

// const mapStateToProps = state=>{
//   return {
//     user: state.usersList
//   }
// }

// export default connect(mapStateToProps, null)(ProtectedRoute)