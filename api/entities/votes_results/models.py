from pydantic import BaseModel


class VotesResultSchema(BaseModel):
    id: int
    legislator_id: int
    vote_id: int
    vote_type: int
