import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import FlexContainer from "../style/FlexContainer";
import StyledH1 from "../style/StyledH1";
import StyledP from "../style/StyledP";
import StyledButton from "../style/StyledButton";

export default function PostingList() {
  const auth = useAuth();
  const token = auth.accessToken;
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
      alert("Plese delte images in posting firstly");
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
      <FlexContainer direction="row" deleteborder deletecolor>
        {postings.data.list.map((posting: posting) => {
          console.log(posting);
          return (
            <FlexContainer
              deleteborder
              deletecolor
              width="400px"
              height="600px"
              justifycontent="center"
            >
              <StyledH1 as="h2">
                Title: {posting.title} #{posting.tags[0]}
              </StyledH1>
              <FlexContainer
                width="95%"
                alignitems="strach"
                justifycontent="start"
              >
                <StyledP>
                  CreatedBy: {posting.createdBy.nickname}/ CreateAt:{" "}
                  {posting.createdAt.substring(0, 10)}
                </StyledP>

                {posting.images[0] ? (
                  <div>
                    <img
                      src={
                        posting.images[0].image
                          ? "data:image/*;base64," + posting.images[0].image
                          : ""
                      }
                      style={{
                        width: "350px",
                        height: "350px",
                        objectFit: "cover",
                      }}
                    ></img>
                    <StyledButton
                      value="Delete this Image"
                      type="button"
                      onClick={() => {
                        deleteImg.mutate({
                          uuid: posting.id,
                          imageId: posting.images[0].id,
                        });
                      }}
                    />
                  </div>
                ) : (
                  <StyledP>*There are no uploaded images*</StyledP>
                )}

                <StyledP>{posting.body}</StyledP>
                <StyledButton
                  id={posting.id}
                  type="button"
                  value="Delete this posting"
                  onClick={() => {
                    deletePosting.mutate(posting.id);
                  }}
                />
              </FlexContainer>
            </FlexContainer>
          );
        })}
      </FlexContainer>
    );
  } else {
    return (
      <>
        <h1>Fail to load postings!!!</h1>
      </>
    );
  }
}
