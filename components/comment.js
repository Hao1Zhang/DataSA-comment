import React from "react";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import { createComment, createPost } from "../src/graphql/mutations";
import { listComments, listPosts } from "../src/graphql/queries";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import "./comment.module.css";
import {
  Amplify,
  API,
  Auth,
  withSSRContext,
  graphqlOperation,
} from "aws-amplify";
// export async function getServerSideProps({ req }) {
//     const SSR = withSSRContext({ req });
//     const response = await SSR.API.graphql({ query: listPosts });

//     return {
//       props: {
//         posts: response.data.listPosts.items
//       }
//     };
//   }
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function CommentExampleMinimal(props) {
  const [comments, setComments] = useState([]);
  const { itemId } = props;
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    try {
      //
      Auth.currentAuthenticatedUser().then((user) => {
        console.log(user);
        setUsername(user.username);
      });
      if (username != "") {
        
      }
    } catch {}
    // {
    //   console.log(itemId);
    // }
  }, []);
  useEffect(() => {
    // if (username != "") {
        
    
    const commentDetail = {
      item_id: {
        eq: itemId,
      },
    };
    API.graphql({
      query: listComments,
      variables: { filter: commentDetail },
    }).then((result) => {
      setComments(result.data.listComments.items);
      // console.log(result);
    });
  // }
  },[username])
  //   const divStyle = {
  //     height: '100px',
  //     overflow: 'hidden',
  //   }
  const handleCreatePost = (event) => {
    //   console.log(event.target[0].value);
    const commentDetails = {
      usernames: username,
      item_id: itemId,
      comment: event.target[0].value,
    };
    // console.log("handleCreatePost");
    // const user = Auth.currentAuthenticatedUser();
    // console.log(user)

    API.graphql({
      query: createComment,
      variables: { input: commentDetails },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
      .then((result) => {
        setComments([...comments, result.data.createComment]);
        console.log(result.data.createComment);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Comment.Group minimal>
        <Header as="h3" dividing>
          Comments
        </Header>
        
          <div>{console.log(comments)}</div>
          <Comment>
            {comments[0] ? (
              comments.map((comment) => {
                return (
                  <Comment.Content key={comment.id}>
                    <Comment.Author as="a">{comment.usernames}</Comment.Author>
                    <Comment.Text>{comment.comment}</Comment.Text>
                  </Comment.Content>
                );
              })
            ) : (
              <></>
            )}
          </Comment>
          <AmplifyAuthenticator>
          <Form reply onSubmit={handleCreatePost}>
            <Form.TextArea />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </AmplifyAuthenticator>
      </Comment.Group>
    </>
  );
}
//     <Comment>
//       <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
//       <Comment.Content>
//         <Comment.Author as='a'>Elliot Fu</Comment.Author>
//         <Comment.Metadata>
//           <span>Yesterday at 12:30AM</span>
//         </Comment.Metadata>
//         <Comment.Text>
//           <p>This has been very useful for my research. Thanks as well!</p>
//         </Comment.Text>
//         <Comment.Actions>
//           <a>Reply</a>
//         </Comment.Actions>
//       </Comment.Content>

//       <Comment.Group>
//         <Comment>
//           <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
//           <Comment.Content>
//             <Comment.Author as='a'>Jenny Hess</Comment.Author>
//             <Comment.Metadata>
//               <span>Just now</span>
//             </Comment.Metadata>
//             <Comment.Text>Elliot you are always so right :)</Comment.Text>
//             <Comment.Actions>
//               <a>Reply</a>
//             </Comment.Actions>
//           </Comment.Content>
//         </Comment>
//       </Comment.Group>
//     </Comment>

//     <Comment>
//       <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
//       <Comment.Content>
//         <Comment.Author as='a'>Joe Henderson</Comment.Author>
//         <Comment.Metadata>
//           <span>5 days ago</span>
//         </Comment.Metadata>
//         <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
//         <Comment.Actions>
//           <a>Reply</a>
//         </Comment.Actions>
//       </Comment.Content>
//     </Comment>

//     <Form reply>
//       <Form.TextArea />
//       <Button content='Add Reply' labelPosition='left' icon='edit' primary />
//     </Form>
//   </Comment.Group>

// }
