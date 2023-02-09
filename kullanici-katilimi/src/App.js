import "./App.css";
import Form from "./Components/Form";
import axios from "axios";
import { useState } from "react";

function App() {
  const [postResponse, setPostResponse] = useState("");
  const handlerPost = (item) => {
    axios
      .post("https://reqres.in/api/users", {
        item,
      })
      .then((response) => {
        console.log(response);
        setPostResponse(response.data.item);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Form handlerPost={handlerPost}></Form>
      {postResponse.isim}
    </div>
  );
}

export default App;
