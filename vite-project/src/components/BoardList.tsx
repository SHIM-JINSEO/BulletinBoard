import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StyledH1 from "../style/StyledH1";
import FlexContainer from "../style/FlexContainer";
import StyledLink from "../style/StyledLink";
export default function BoardList() {
  const { data, error } = useQuery({
    queryKey: ["boards"],
    queryFn: () =>
      axios.get("/api/boards").then((res) => {
        return res.data.list;
      }),
    initialData: [],
  });
  type board = {
    id: string;
    title: string;
    createdAt: string;
    creator: {
      id: string;
      email: string;
      nickname: string;
      createdAt: string;
    };
  };
  if (data) {
    console.log();
    return (
      <FlexContainer deleteborder={true} flexwrap="wrap">
        <StyledH1>Board List</StyledH1>
        <ul style={{ listStyle: "none" }}>
          {data.map((board: board) => {
            return (
              <StyledLink to={"/board/" + board.id} key={board.id}>
                <li>
                  {board.title}
                  <br />
                  CreatedBy
                  <br />`{board.creator.nickname}`
                </li>
              </StyledLink>
            );
          })}
        </ul>
      </FlexContainer>
    );
  } else {
    console.log(error);
    return;
  }
}
