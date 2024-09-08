import { useNavigate, useParams } from "react-router-dom";
import { useBorads } from "../Context/BoardsContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const token = localStorage.getItem("accessToken");

function Posting() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [img, setImg] = useState<Blob | null>(null);

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
    onSuccess(data) {
      console.log("post successfully");
      if (!img) {
        queryClient.invalidateQueries({ queryKey: ["postings"] });
        return;
      } else {
        const formData = new FormData();
        formData.append("file", img);
        postImage.mutate({ uuid: data.data.id, formData: formData });
      }
    },
    onError(err) {
      console.log(err);
    },
  });

  const postImage = useMutation({
    mutationFn: ({ uuid, formData }: { uuid: string; formData: FormData }) =>
      axios.post(`/api/posts/${uuid}/image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess() {
      console.log("img uploaded successfully:");
      queryClient.invalidateQueries({ queryKey: ["postings"] });
    },
    onError() {
      console.log("failed to upload image");
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
        <label>Image</label>
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            if (event.target.files) {
              const file = event.target.files[0];
              setImg(file);
            }
          }}
        />
        <br />
        <input type="submit" value="Posting" />
      </form>
    </>
  );
}
function PostingList() {
  const params = useParams();
  const queryClient = useQueryClient();
  const deletePosting = useMutation({
    mutationFn: (postingId) =>
      axios.delete(`/api/posts/${postingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess() {
      console.log("delete successfully");
      queryClient.invalidateQueries({ queryKey: ["postings"] });
    },
    onError(err) {
      console.log(err);
    },
  });
  const deleteImg = useMutation({
    mutationFn: ({ uuid, imageId }: { uuid: string; imageId: string }) =>
      axios.delete(`/api/posts/${uuid}/image/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess() {
      console.log("delete img successfully");
      queryClient.invalidateQueries({ queryKey: ["postings"] });
    },
    onError(err) {
      console.log(err);
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
              <p>Image</p>
              {posting.images[0] ? (
                <img
                  src={
                    posting.images[0].image
                      ? "data:image/jpeg;base64," + posting.images[0].image
                      : ""
                  }
                ></img>
              ) : (
                <p>"There is no images"</p>
              )}
              <p>Tag</p>
              <p>{posting.tags[0]}</p>
              <input
                value="Delete this Image"
                type="button"
                onClick={() => {
                  deleteImg.mutate({
                    uuid: posting.id,
                    imageId: posting.images[0].id,
                  });
                }}
              />
              <br />
              <input
                id={posting.id}
                type="button"
                value="Delete this posting"
                onClick={() => {
                  deletePosting.mutate(posting.id);
                }}
              />
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
