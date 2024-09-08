import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function PostingList() {
  const token = localStorage.getItem("accessToken");
  const params = useParams();
  const queryClient = useQueryClient();
  const deletePosting = useMutation({
    mutationFn: (postingId: string) =>
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
  const { data: postings, error } = useQuery({
    queryKey: ["postings"],
    queryFn: () => axios.get(`/api/posts?boardUuid=${params.boardId}`),
  });

  if (!error && postings) {
    type posting = {
      id: string;
      title: string;
      body: string;
      tags: string[];
      board: {
        id: string;
        title: string;
        createdAt: string;
        creator: {
          id: string;
          email: string;
          nicknam: string;
          createdAt: string;
        };
      };
      createdAt: string;
      createdBy: {
        id: string;
        email: string;
        nickname: string;
        createdAt: string;
      };
      images: [
        {
          image: string;
          id: string;
        }
      ];
    };
    return (
      <>
        <h2>Posting List</h2>
        {postings.data.list.map((posting: posting) => {
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
