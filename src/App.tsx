// Components
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { postsApi } from 'pages/api/postsApi';
import { Posts } from 'pages/Posts/Posts';
import { Post } from 'pages/Post/Post';
// Styles
import './App.css';

const router = createHashRouter([
  {
    path: '/',
    element: <Posts />,
  },
  {
    path: '/:postId',
    element: <Post />,
  },
]);
function App() {
  return (
    <ApiProvider api={postsApi}>
      <RouterProvider router={router} />
    </ApiProvider>
  );
}

export default App;
