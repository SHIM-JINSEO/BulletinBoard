import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

export default function CreatePosting() {
  const auth = useAuth();
  const token = auth.accessToken;
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
