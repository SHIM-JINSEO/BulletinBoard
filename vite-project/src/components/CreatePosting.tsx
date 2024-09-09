import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import StyledButton from "../style/StyledButton";
import StyledP from "../style/StyledP";
import FlexContainer from "../style/FlexContainer";
import StyledH1 from "../style/StyledH1";
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
    <FlexContainer deleteborder deletecolor width="400px" height="600px">
      <StyledH1 as="h2">Upload Posting</StyledH1>
      <FlexContainer width="95%" alignitems="strach">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            postPostings.mutate();
          }}
        >
          <FlexContainer alignitems="start" deleteborder>
            <StyledP>
              Title
              <input
                type="text"
                onChange={(event) => setTitle(event.target.value)}
              />
            </StyledP>
            <StyledP>
              #Tag{" "}
              <input
                type="text"
                onChange={(event) => setTag(event.target.value)}
              />
            </StyledP>
          </FlexContainer>
          <StyledP>Body</StyledP>
          <textarea
            onChange={(event) => setBody(event.target.value)}
            style={{ width: "100%", height: "200px" }}
          />
          <StyledButton
            id="file"
            name="file"
            type="file"
            accept="image/*"
            onChange={(event) => {
              if (event.target.files) {
                const file = event.target.files[0];
                setImg(file);
              }
            }}
          />
          <StyledButton type="submit" value="Posting" />
        </form>
      </FlexContainer>
    </FlexContainer>
  );
}
