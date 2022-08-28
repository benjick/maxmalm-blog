import React from "react";

interface Props {
  name: string;
  published?: boolean;
}

const Paper = ({ paper }: any) => {
  if (!paper) {
    return null;
  }
  let text;
  if (paper) {
    text = <>Skickat till {paper.name}.</>;
  }
  if (paper && paper.published === false) {
    text = (
      <>
        {paper.name} valde att <strong>inte</strong> publicera artikeln.
      </>
    );
  }
  if (paper && paper.published === true) {
    text = <>{paper.name} valde att publicera artikeln.</>;
  }
  if (!text) {
    return null;
  }
  return (
    <>
      <hr
        style={{
          marginBottom: "1.75rem",
        }}
      />
      <h4
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        Tidningen
      </h4>
      <p>{text}</p>
    </>
  );
};

export default Paper;
