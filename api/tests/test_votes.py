from fastapi import HTTPException, FastAPI
from unittest.mock import mock_open, patch
from fastapi.testclient import TestClient
from ..src.entities.votes import CSV_FILE, VoteRepository, VoteServices, VoteController
from ..src.entities.votes.controllers import NOT_FOUND_MESSAGE
from ..src.entities.votes.routes import router

mock_csv_data = "id,bill_id\n1,2900994\n2,2900995\n"

app = FastAPI()
app.include_router(router)

client = TestClient(app)


def test_votes_repository_read_csv():
    expected_result = [
        {"id": 1, "bill_id": 2900994},
        {"id": 2, "bill_id": 2900995},
    ]

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.votes.repositories.CSV_FILE", CSV_FILE):
            result = VoteRepository.read_csv()
            assert result == expected_result


def test_votes_services_get_all():
    expected_result = [
        {"id": 1, "bill_id": 2900994},
        {"id": 2, "bill_id": 2900995},
    ]

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.votes.repositories.CSV_FILE", CSV_FILE):
            result = VoteServices.get_all()
            assert result == expected_result


def test_votes_services_get_vote():
    expected_result = {"id": 1, "bill_id": 2900994}
    vote_id = 1

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.votes.repositories.CSV_FILE", CSV_FILE):
            result = VoteServices.get_by_id(vote_id)
            assert result == expected_result


def test_votes_controller_get_all_votes():
    expected_result = [
        {"id": 1, "bill_id": 2900994},
        {"id": 2, "bill_id": 2900995},
    ]

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.votes.repositories.CSV_FILE", CSV_FILE):
            result = VoteController.get_all_votes()
            assert result == expected_result


def test_votes_controller_get_vote():
    expected_result = {"id": 1, "bill_id": 2900994}
    vote_id = 1

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.votes.repositories.CSV_FILE", CSV_FILE):
            result = VoteController.get_vote(vote_id)
            assert result == expected_result


def test_votes_controller_get_vote_empty():
    vote_id = 3
    expected_status_code = 404
    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.votes.repositories.CSV_FILE", CSV_FILE):
            try:
                VoteController.get_vote(vote_id)
            except HTTPException as e:
                assert e.status_code == expected_status_code
                assert e.detail == NOT_FOUND_MESSAGE


def test_votes_routes_get_all_votes():
    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.votes.repositories.CSV_FILE", CSV_FILE):
            response = client.get("/votes/")
            assert response.status_code == 200
            assert isinstance(response.json(), list)


def test_votes_routes_get_vote():
    vote_id = 1
    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.votes.repositories.CSV_FILE", CSV_FILE):
            response = client.get(f"/votes/{vote_id}")
            assert response.status_code == 200
            assert isinstance(response.json(), dict)
