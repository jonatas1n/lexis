from fastapi import HTTPException, FastAPI
from unittest.mock import mock_open, patch
from fastapi.testclient import TestClient
from ..src.entities.votes_results import (
    CSV_FILE,
    VotesResultRepository,
    VotesResultServices,
    VotesResultController,
)
from ..src.entities.votes_results.routes import router
from ..src.entities.votes_results.controllers import NOT_FOUND_MESSAGE

mock_csv_data = "id,legislator_id,vote_id,vote_type\n1,101,201,1\n2,102,202,2\n"

app = FastAPI()
app.include_router(router)

client = TestClient(app)


def test_votes_results_repository_read_csv():
    expected_result = [
        {"id": 1, "legislator_id": 101, "vote_id": 201, "vote_type": 1},
        {"id": 2, "legislator_id": 102, "vote_id": 202, "vote_type": 2},
    ]

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.votes_results.repositories.CSV_FILE", CSV_FILE):
            result = VotesResultRepository.read_csv()
            assert result == expected_result


def test_votes_results_services_get_all():
    expected_result = [
        {"id": 1, "legislator_id": 101, "vote_id": 201, "vote_type": 1},
        {"id": 2, "legislator_id": 102, "vote_id": 202, "vote_type": 2},
    ]

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.votes_results.repositories.CSV_FILE", CSV_FILE):
            result = VotesResultServices.get_all()
            assert result == expected_result


def test_votes_results_services_get_votes_result():
    expected_result = {"id": 1, "legislator_id": 101, "vote_id": 201, "vote_type": 1}
    votes_result_id = "1"

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.votes_results.repositories.CSV_FILE", CSV_FILE):
            result = VotesResultServices.get_by_id(votes_result_id)
            assert result == expected_result


def test_votes_results_controller_get_all_votes_results():
    expected_result = [
        {"id": 1, "legislator_id": 101, "vote_id": 201, "vote_type": 1},
        {"id": 2, "legislator_id": 102, "vote_id": 202, "vote_type": 2},
    ]

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.votes_results.repositories.CSV_FILE", CSV_FILE):
            result = VotesResultController.get_all_votes_results()
            assert result == expected_result


def test_votes_results_controller_get_votes_result():
    expected_result = {"id": 1, "legislator_id": 101, "vote_id": 201, "vote_type": 1}
    votes_result_id = 1

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.votes_results.repositories.CSV_FILE", CSV_FILE):
            result = VotesResultController.get_votes_result(votes_result_id)
            assert result == expected_result


def test_votes_results_controller_get_votes_result_empty():
    votes_result_id = 3
    expected_status_code = 404
    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.votes_results.repositories.CSV_FILE", CSV_FILE):
            try:
                VotesResultController.get_votes_result(votes_result_id)
            except HTTPException as e:
                assert e.status_code == expected_status_code
                assert e.detail == NOT_FOUND_MESSAGE


def test_votes_results_routes_get_all_votes_results():
    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.votes_results.repositories.CSV_FILE", CSV_FILE):
            response = client.get("/votes_results/")
            assert response.status_code == 200
            assert isinstance(response.json(), list)


def test_votes_results_routes_get_votes_result():
    votes_result_id = 1
    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.votes_results.repositories.CSV_FILE", CSV_FILE):
            response = client.get(f"/votes_results/{votes_result_id}")
            assert response.status_code == 200
            assert isinstance(response.json(), dict)
