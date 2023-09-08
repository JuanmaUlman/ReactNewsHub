import React, { useEffect, useRef } from "react";
import "./PhonePreview.css";
import parse from "html-react-parser";

const PhonePreview = ({ content, title, subtitle, backgroundImage }) => {
  const screenRef = useRef(null);

  useEffect(() => {
    if (screenRef.current) {
      const screen = screenRef.current;
      screen.scrollTop = 0;
    }
  }, [content]);

  return (
    <div className="iphone11">
      <div className="screen ql-editor" ref={screenRef}>
        <div className="image-container">
          <img src={backgroundImage} alt="" />
        </div>
        <div className="screen-container">
          <h1>{title}</h1>
          <h2>{subtitle}</h2>

          {parse(content, {
            replace: (domNode) => {
              if (domNode.name === "img") {
                return (
                  <img
                    src={domNode.attribs.src}
                    alt={domNode.attribs.alt}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                  />
                );
              }
            },
          })}
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;
