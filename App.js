import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [userName, setUsername] = useState("14streety");
  const [posts, setPosts] = useState([]);

  const handlerInputText = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    getPosts();
  }, [userName]);

  const getPosts = async () => {
    if (userName != "") {
      const response = await fetch(
        `https://www.instagram.com/${userName}/?__a=1`
      );
      const data = await response.json();
      setPosts(data.graphql.user.edge_owner_to_timeline_media.edges);
    }
  };

  const getSearch = (e) => {
    e.preventDefault();
    setUsername(inputText);
  };
  console.log(posts.map((post) => post.node.thumbnail_src));
  const download = (e) => {
    fetch(e.target.value, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <div className="container p-4">
        <div className="row">
          <div className="col-md-3">
            <h4>Enter Username ( 14streety)</h4>
            <form onSubmit={getSearch}>
              <input
                type="text"
                onChange={handlerInputText}
                value={inputText}
                className="form-control"
                placeholder="enter username"
              />

              <button style={{ marginTop: 15 }} className="btn btn-success">
                Get Instagram Posts!
              </button>
            </form>
          </div>
          <div className="col-md-9">
            <div className="row">
              {posts.map((item, i) => (
                <div key={i} className="col-md-3 pb-2">
                  <img
                    style={{ width: 100 + "%" }}
                    src={item.node.thumbnail_src}
                    alt=""
                  />
                  <button
                    className="btn btn-success"
                    value={item.node.thumbnail_src}
                    download
                    onClick={(e) => download(e)}
                  >
                    download
                  </button>
                  {/* <span>
                    {item.node.edge_media_to_caption.edges[0].node.text}
                  </span> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
