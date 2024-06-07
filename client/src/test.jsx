import React, { useState } from 'react';

function Test({ post }) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const handleLike = async () => {
    // Optimistically update UI
    setIsLiked(!isLiked);
    try {
      // Make API call to like or unlike post
      if (isLiked) {
        // await unlikePostApiCall(post._id);
		setLikeCount((prev)=>prev-1)
      } else {
        // await likePostApiCall(post._id);
		setLikeCount((prev)=>prev+1)
      }
    } catch (error) {
      console.error('Failed to update like', error);
    }
  };

  return (
    <div>
      <p>{post.content}</p>
      <button onClick={handleLike}>
        {isLiked ? 'Unlike' : 'Like'} ({likeCount})
      </button>
    </div>
  );
}


export default Test;
