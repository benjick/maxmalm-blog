import React from 'react';
import { rhythm } from '../utils/typography';

const Refs = ({ refs }) => {
  if (!refs) {
    return null;
  }
  return (
    <>
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <h4
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}>
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
