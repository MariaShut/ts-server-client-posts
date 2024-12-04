import { FC } from 'react';
import { PostList } from '../../api/Post';
import { PostView } from '../PostView/PostView';
import './PostListView.css';

export interface PostListViewProps {
  postList: PostList
}

export const PostListView: FC<PostListViewProps> = ({ postList }) => {
  return (
    <ul className="post-list">
      {postList.map((post) => (
        <li key={post.id} className="post-list__item">
          <PostView post={post} />
        </li>
      ))}
    </ul>
  );
};
