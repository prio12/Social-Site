import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const DevTypeWriter = () => {
  const [text] = useTypewriter({
    words: ["A Social Site", "Share Your Thoughts", "See Others Activities", "200k+ Users!!"],
    loop: 10000000,
    onLoopDone: () => console.log(`loop completed after 3 runs.`),
  });

  return (
    <div>
      <h4 className="text-2xl font-bold text-white"> 
       <span  style={{ marginLeft:"3px", fontWeight: 'bolder' }}>{text}</span>
      <Cursor cursorColor="var(--color-primary)" />
      </h4>
    </div>
  );
};

export default DevTypeWriter;
