import React from "react";

interface Props {
  refs: string[] | null;
}

const Refs = ({ refs }: Props) => {
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
