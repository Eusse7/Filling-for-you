from pydantic import BaseModel

class Knowledge(BaseModel):
    about_me: str = "Cuéntanos sobre ti: Soy un candidato con experiencia en ..."
    strengths: str = "Fortalezas: aprendizaje rápido, comunicación clara, disciplina."
    salary_expectation: str = "Expectativa salarial: (ajustable según rol y modalidad)."
    cover_letter: str = "Carta/introducción: Me interesa esta vacante porque ..."
