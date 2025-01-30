from pydantic import BaseModel


class LegislatorSchema(BaseModel):
    id: int
    title: str
