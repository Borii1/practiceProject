"use client"
import { useState, useEffect } from "react"

import PromptCard from "./PromptCard"

const PromptCardList = ({data,handleTagClick}) =>{
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key = {post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchtimeout, setSearchTimeout] = useState(null)
  const [searchResults, setSearchResults] = useState([]);

const searchFilter = (searchtext) => {
    const regex = new RegExp(searchtext, 'i');
    return posts.filter((post) => 
      regex.test(post.prompt) ||
      regex.test(post.tag) ||
      regex.test(post.creator.username)
    );
}

  const handleSearchChange = (e) =>{
    clearTimeout(searchtimeout);
    setSearchText(e.target.value);

    setSearchTimeout(setTimeout(() => {
      const searchResult = searchFilter(e.target.value);
      setSearchResults(searchResult);
    }, 300));
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);

    const searchResult = searchFilter(tag);
    setSearchResults(searchResult);
  }

  useEffect(() => {
    const fetchPosts = async () =>{
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }
    console.log("posts",posts)
    fetchPosts();
  }, []);
  
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
        type="text"
        placeholder="Search for a tag or a username"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer"/>
      </form>

      {searchText ? (
        <PromptCardList
          data={searchResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>

  )
}

export default Feed