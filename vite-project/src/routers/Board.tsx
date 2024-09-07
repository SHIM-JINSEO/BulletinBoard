import { useNavigate, useParams } from "react-router-dom";
import { useBorads } from "../Context/BoardsContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const token = localStorage.getItem("tokens");

function Posting() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("");
  const params = useParams();
  const postPostings = useMutation({
    mutationFn: () =>
      axios.post(
        `/api/posts?boardUuid=${params.boardId}`,
        { title: title, body: body, tags: [tag] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    onSuccess() {
      console.log("post success");
      queryClient.invalidateQueries({ queryKey: ["postings"] });
    },
  });

  return (
    <>
      <h2>Posting</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          postPostings.mutate();
        }}
      >
        <label>Title</label>
        <br />
        <input type="text" onChange={(event) => setTitle(event.target.value)} />
        <br />
        <label>body</label>
        <br />
        <textarea onChange={(event) => setBody(event.target.value)} />
        <br />
        <label>Tag</label>
        <br />
        <input type="text" onChange={(event) => setTag(event.target.value)} />
        <br />
        <input type="submit" value="Posting" />
      </form>
    </>
  );
}
function PostingList() {
  const params = useParams();
  const queryClient = useQueryClient();
  const deltePosting = useMutation({
    mutationFn: (postingID) =>
      axios.delete(`/api/posts/${postingID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess() {
      console.log("delete successfully");
      queryClient.invalidateQueries({ queryKey: ["postings"] });
    },
  });
  const getPostings = useQuery({
    queryKey: ["postings"],
    queryFn: () => axios.get(`/api/posts?boardUuid=${params.boardId}`),
  });
  const { data: postings, error } = getPostings;
  if (!error && postings) {
    return (
      <>
        <h2>Posting List</h2>
        {postings.data.list.map((posting) => {
          return (
            <div key={posting.id} style={{ border: "1px solid grey" }}>
              <p>Title: {posting.title}</p>
              <p>CreateAt: {posting.createdAt}</p>
              <p>CreatedBy: {posting.createdBy.nickname}</p>
              <p>Body</p>
              <p>{posting.body}</p>
              <input
                id={posting.id}
                type="button"
                value="Delete this posting"
                onClick={(event) => {
                  deltePosting.mutate(event.target.id);
                }}
              ></input>
            </div>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        <h1>Fail to load postings!!!</h1>
      </>
    );
  }
}
export default function Board() {
  const queryClient = useQueryClient();
  const params = useParams();
  const boards = useBorads();
  const naviagte = useNavigate();

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
  let currentBorad: board | undefined = undefined;
  boards.forEach((board: board) => {
    if (board.id === params.boardId) {
      currentBorad = board;
    }
  });
  const deleteBoard = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`/api/boards/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      naviagte("../");
    },
  });
  if (currentBorad) {
    return (
      <>
        <h1>{currentBorad.title}</h1>
        <input
          type="button"
          value="Delete this board"
          onClick={() => {
            deleteBoard.mutate(params.boardId);
          }}
        />
        <Posting />
        <PostingList />
      </>
    );
  } else {
    return <h1>We cannot find this borad</h1>;
  }
}
