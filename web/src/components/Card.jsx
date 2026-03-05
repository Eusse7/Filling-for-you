import React from "react";

export default function Card({ title, subtitle, right, children }) {
  return (
    <section className="card">
      <div className="cardHeader">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        <div className="rowRight">{right}</div>
      </div>
      <div className="cardBody">{children}</div>
    </section>
  );
}
