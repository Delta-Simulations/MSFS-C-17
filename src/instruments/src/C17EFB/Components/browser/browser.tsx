import React, { useState } from 'react';

export const Browser = () => {
  const [url, setUrl] = useState("https://www.bing.com");
  const [input, setInput] = useState("https://www.bing.com");

  const goToPage = () => {
    let formatted = input;

    if (!formatted.startsWith("http://") && !formatted.startsWith("https://")) {
      formatted = "https://" + formatted;
    }

    setUrl(formatted);
  };

  return (
    <div>
      <div style={{ marginBottom: "8px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "900px", padding: "6px" }}
        />
        <button onClick={goToPage} style={{ marginLeft: "6px", padding: "6px 10px" }}>
          Go
        </button>
      </div>

      <iframe
        width="1040"
        height="810"
        src={url}
        frameBorder="0"
        title="browser"
      />
    </div>
  );
};