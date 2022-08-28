import React from "react";

const Refs = ({ refs }: { refs?: string[] }) => {
  if (!refs) {
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
          marginTop: 0,
        }}
      >
        Referenser
      </h4>
      {refs.map((ref) => (
        <li key={ref}>
          <a href={ref}>{ref}</a>
        </li>
      ))}
    </>
  );
};

export default Refs;
