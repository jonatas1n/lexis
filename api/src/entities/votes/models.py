from pydantic import BaseModel


class VoteSchema(BaseModel):
    id: int
    bill_id: int
