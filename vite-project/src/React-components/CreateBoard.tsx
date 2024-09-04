import axios from "axios";
import { useState } from "react";

export default function CreateBoard() {
  const token = localStorage.getItem("tokens");
  function postBoard(boardTitle: string) {
    axios
      .post(
        "/api/boards",
        {
          title: boardTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const [boardTitle, setBoardTitle] = useState("");
  return (
    <>
      <h2>Create New Board!!!</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          postBoard(boardTitle);
        }}
      >
        <input
          type="text"
          name="CrateBoard"
          onChange={(event) => {
            setBoardTitle(event.target.value);
          }}
        />
        <br></br>
        <input type="submit" value="CreateNewBoard" />
      </form>
    </>
  );
}
