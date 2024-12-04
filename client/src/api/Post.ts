import { useEffect, useState } from 'react';
import { z } from 'zod'

export const PostSchema = z.object({
  id: z.string(),
  text: z.string(),
  authorId: z.string(),
  createdAt: z.number(),
})

export type Post = z.infer<typeof PostSchema>;

export const PostList = z.array(PostSchema);

export type PostList = z.infer<typeof PostList>;

export const fetchPostListSchema = z.object({
  list: PostList,
})

type fetchPostListResponse = z.infer<typeof fetchPostListSchema>;

export function fetchPostList(): Promise<fetchPostListResponse> {
  return fetch("/api/posts")
    .then((response) => response.json())
    .then((data) => fetchPostListSchema.parse(data))
}

interface IdleRequestState {
  status:"idle";
}

interface LoadingRequestState {
  status:"pending";
}

interface SuccessRequestState {
  status:"success";
  data: PostList;
}

interface ErrorRequestState {
  status:"error";
  error: unknown;
}

type RequestState =
  | IdleRequestState
  | LoadingRequestState
  | SuccessRequestState
  | ErrorRequestState;

export function usePostList() {
  const [state, setState] = useState<RequestState>({ status:"idle" });

  useEffect(() => {
    if(state.status === "pending") {
      fetchPostList().then((data) => {
        setState({ status: "success", data: data.list });
      }).catch((error) => {
        setState({ status: "error", error });
      });
    }
  }, [state]);

  useEffect(() => {
    setState({ status: "pending" });
  }, [])

  const refetch = () => {
    setState({ status: "pending" });
  }

  return {
    state,
    refetch,
  }
}
