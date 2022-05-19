import React from 'react';
import Loader from '../../components/Loader/index';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updatePostByIdThunk } from 'services/features/posts/operations';
import { formUtils } from 'views/utils/constants';
import { retrievePostById } from 'services/features/posts/actions';

const UpdatePost = ({ postId }) => {
  const { loading, retrievedPostById } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(retrievePostById(postId));
  }, [dispatch, postId]);

  const [postValues, setPostValues] = React.useState({
    postId: retrievedPostById.id ? retrievedPostById.id : postId,
    userId: retrievedPostById.userId ? retrievedPostById.userId : '',
    title: retrievedPostById.title ? retrievedPostById.title : '',
    article: retrievedPostById.body ? retrievedPostById.body : '',
  });

  const { userId, title, article, submit } = formUtils;

  const handleChange = (event) => {
    setPostValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };
  const handleClick = (event) => {
    event.preventDefault();
    dispatch(updatePostByIdThunk(postValues));
  };

  return (
    <div>
      {!loading && <Loader height={'2rem'} width={'2rem'} color={'pink'} />}
      <div>
        <label htmlFor="userId">{userId}</label>
        <input
          type="text"
          name="userId"
          value={postValues.userId}
          onChange={handleChange}
        />
        <label htmlFor="title">{title}</label>
        <input
          type="text"
          name="title"
          value={postValues.title}
          onChange={handleChange}
        />
        <label htmlFor="article">{article}</label>
        <textarea
          name="article"
          value={postValues.article}
          onChange={handleChange}
          rows="4"
          cols="50"
        />
        <button onClick={handleClick} type="submit">
          {submit}
        </button>
      </div>
    </div>
  );
};

export default UpdatePost;
