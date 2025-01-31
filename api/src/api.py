from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .entities.bills import router as bills_router
from .entities.legislators import router as legislators_router
from .entities.votes import router as votes_router
from .entities.votes_results import router as votes_results_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to restrict access
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(bills_router)
app.include_router(legislators_router)
app.include_router(votes_router)
app.include_router(votes_results_router)


@app.get("/")
async def root():
    return {"message": "I'm working!"}
