import { useQuery } from "@tanstack/react-query";
import { fetchPostList } from "../../api/Post"
import { Loader } from "../Loader";
import { PostListView } from "./PostListView";
import { queryClient } from "../../api/queryClient";

export const FetchPostListView = () => {
  const postListQuery = useQuery(
    {
    queryFn: () => fetchPostList(),
    queryKey: ["posts"],
    },
    queryClient
  );

  switch(postListQuery.status) {
    case "pending":
      return <Loader />;

    case "success":
      return <PostListView postList={postListQuery.data.list}/>

    case "error":
      return (
        <div>
          <span>Произошла ошибка</span>
          <button onClick={() => postListQuery.refetch()}>Повторить запрос</button>
        </div>
      );
  }
}
