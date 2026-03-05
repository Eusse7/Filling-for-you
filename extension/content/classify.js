globalThis.Autofill  = globalThis.Autofill  || {};

(function(ns) {
  function norm(s) { return String(s || "").toLowerCase(); }

  const autocompleteMap = {
    name: "full-name",
    "given-name": "given-name",
    "additional-name": "given-name",
    "family-name": "family-name",
    email: "email",
    tel: "tel",
    "tel-national": "tel",
    "street-address": "address-line1",
    "address-line1": "address-line1",
    "address-level2": "address-level2",
    country: "country-name",
    "country-name": "country-name"
  };

  function checkKeywords(hay, keywords) {
    return keywords.some(kw => hay.includes(kw));
  }

  function guessKey(field) {
    if (field.autocomplete) {
      const tokens = norm(field.autocomplete).split(/\s+/).filter(Boolean);
      const token = tokens.at(-1);
      if (autocompleteMap[token]) return autocompleteMap[token];
    }

    const hay = norm(`${field.name} ${field.id} ${field.ariaLabel} ${field.placeholder} ${field.label}`);

    const keywordRules = [
      [["full name", "nombre completo"], "full-name"],
      [["email"], "email"],
      [["phone", "tel", "cel", "mobile"], "tel"],
      [["first", "nombre"], "given-name"],
      [["last", "apellido"], "family-name"],
      [["address", "dirección", "direccion"], "address-line1"],
      [["city", "ciudad"], "address-level2"],
      [["country", "país", "pais"], "country-name"],
      [["linkedin"], "url-linkedin"],
      [["github"], "url-github"],
      [["cuéntanos", "cuentanos", "about", "sobre ti"], "knowledge-about"],
      [["fortaleza", "strength"], "knowledge-strengths"],
      [["salario", "salary", "compens"], "knowledge-salary"],
      [["carta", "cover", "introducción", "introduccion"], "knowledge-cover"]
    ];

    for (const [keywords, result] of keywordRules) {
      if (checkKeywords(hay, keywords)) return result;
    }

    return null;
  }

  ns.classify = { guessKey };
})(globalThis.Autofill );
