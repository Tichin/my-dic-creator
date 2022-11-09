import React from "react";
import Definition from "../definition/definition.component";
import "./dictionary.styles.scss";

export default function Dictionary({ meanings }) {
  let renderDefinitions = "loading...";

  if (meanings) {
    renderDefinitions = meanings.map((meaning) => {
      const partOfSpeech = meaning.partOfSpeech;
      return meaning.definitions.map((definitions, index) => (
        <li key={index}>
          <Definition
            partOfSpeech={partOfSpeech}
            definition={definitions.definition}
            example={definitions.example}
          />
        </li>
      ));
    });
  }
  return (
    <div className="definitions-container">
      <ul>{renderDefinitions}</ul>
    </div>
  );
}
