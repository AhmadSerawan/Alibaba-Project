// import { Container, Row , Col} from "react-bootstrap"
// import PageLayout from "../../Layouts/PageLayout"
// import { useContext } from "react"
// import { AuthContext } from "../../Services/AuthService"

// import {NavLink} from 'react-router'

// const Profile3 = () => {


//   const {user} = useContext( AuthContext )

//   if(!user) {
//     return <PageLayout>
//       <Container>
//         <Row>
//           <Col>
//             <div>

//               You are not authorized to view this content
//               <br />
//               <div className="d-flex gap-3">
//                 Please <NavLink to="/login3">Log In</NavLink>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </PageLayout>
//   }

//   return (
//     <PageLayout>
//         <Container>
//           <Row>
//             <Col>
//               <h1>
//                 Profile Page (Auth 3)
                
//               </h1>
//               <div className="my-5">

//                 Hello: { user ? user.current_user.name : <></> }
//                 <br />
//                 Your ID: { user ? user.current_user.uid : <></> }
//               </div>
//             </Col>
//           </Row>
//         </Container>
//     </PageLayout>
//   )
// }

// export default Profile3