import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { fetchUser } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { Loader } from "../Loader";
import { UserView } from "./UserView";

interface FetchUserViewProps {
  userId: string;
}

export const FetchUserView: FC<FetchUserViewProps> = ({ userId }) => {
  const userQuery = useQuery(
    {
    queryFn: () => fetchUser(userId),
    queryKey: ["users", userId],
    },
    queryClient
  );

  switch (userQuery.status) {
    case "pending":
      return <Loader />;

    case "success":
      return <UserView user={userQuery.data} />;

    case "error":
      return (
        <div>
          <span>Произошла ошибка</span>
          <button onClick={() => userQuery.refetch()}>Попробовать ещё раз </button>
        </div>
      );
  }
}
