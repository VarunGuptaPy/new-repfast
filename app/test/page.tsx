"use client";

import { first200Tweets } from "@/utils/global";

const Test = () => {
  return (
    <div className="flex justive-center items-center">
      <button
        className="p-3"
        onClick={async () => {
          const ft = await first200Tweets("1608765933354635266");
          console.log(ft);
        }}
      >
        Test
      </button>
    </div>
  );
};

export default Test;
