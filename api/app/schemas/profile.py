from pydantic import BaseModel

class Profile(BaseModel):
    firstName: str = "Juan"
    lastName: str = "Pérez"
    email: str = "juan.perez@email.com"
    phone: str = "+57 3000000000"
    addressLine1: str = "Calle 123 #45-67"
    city: str = "Medellín"
    country: str = "CO"
    linkedin: str = "https://linkedin.com/in/juan"
    github: str = "https://github.com/juan"
