from pydantic import BaseModel


class BillSchema(BaseModel):
    id: int
    title: str
    primary_sponsor: int
