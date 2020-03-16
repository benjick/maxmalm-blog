import React from "react"
import { rhythm } from "../utils/typography"

const Paper = ({ paper }) => {
  if (!paper) {
    return null
  }
  let text
  if (paper && paper.published === false) {
    text = <>{paper.name} valde att <strong>inte</strong> publicera artikeln.</>
  }
  if (!text) {
    return null
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
        }}
      >
        Resultat
      </h4>
      <p>{text}</p>
    </>
  )
}

export default Paper
