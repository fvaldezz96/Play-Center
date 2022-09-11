import { forumAnswers } from "../data";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { useState } from "react";

export default function ForumAnswers() {
  const [likes, setLikes] = useState(0);

  function handleOnClick1() {
    setLikes(likes + 1);
  }

  function handleOnClick2() {
    setLikes(likes - 1);
  }

  return (
    <div className="max-w-sm mx-5 my-3 mb-10 overflow-hidden rounded shadow-lg bg-slate-400">
      {forumAnswers?.map((answer) => (
        <div className="border">
          <div className="px-4 mx-5 my-6">
            <div className="flex my-2">
              <img
                className="w-12 h-12 mr-2 rounded-full"
                src={answer?.img}
                alt=""
              />
              <span className="text-base font-bold">{answer?.username}</span>
            </div>
            <div className="flex-1 ">
              <p className="text-base text-gray-700">{answer?.answer}</p>
            </div>
            <div className="flex">
              <button
                className="mx-1 my-2 cursor-pointer"
                onClick={handleOnClick1}
              >
                <AiFillLike />
              </button>
              <button
                className="mx-1 my-2 cursor-pointer"
                onClick={handleOnClick2}
              >
                <AiFillDislike />
              </button>
              <p className="px-2">{likes}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
