import pytest
from fastapi import HTTPException, FastAPI
from unittest.mock import mock_open, patch
from fastapi.testclient import TestClient
from ..src.entities.legislators import (
    CSV_FILE,
    LegislatorRepository,
    LegislatorServices,
    LegislatorController,
)

from ..src.entities.legislators.controllers import NOT_FOUND_MESSAGE
from ..src.entities.legislators.routes import router

mock_csv_data = "id,name\n1,Test Legislator\n2,Another Legislator\n"
mock_votes_results_csv_data = (
    "id,legislator_id,vote_id,vote_type\n1,101,201,1\n2,102,202,2\n"
)

app = FastAPI()
app.include_router(router)

client = TestClient(app)


@pytest.fixture
def mock_legislators():
    return [
        {"id": 1, "name": "Jônatas Gomes"},
        {"id": 2, "name": "Virgil Hawkins"},
    ]


@pytest.fixture
def mock_votes_results():
    return [
        {"legislator_id": 1, "vote_type": 1},
        {"legislator_id": 1, "vote_type": 2},
        {"legislator_id": 2, "vote_type": 1},
    ]


def test_legislators_repository_read_csv():
    expected_result = [
        {"id": 1, "name": "Test Legislator"},
        {"id": 2, "name": "Another Legislator"},
    ]

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.legislators.repositories.CSV_FILE", CSV_FILE):
            result = LegislatorRepository.read_csv()
            assert result == expected_result


@patch("api.src.entities.legislators.services.LegislatorRepository.read_csv")
@patch("api.src.entities.legislators.services.VotesResultRepository.read_csv")
def test_legislators_services_get_all(
    mock_votes_read_csv, mock_legislators_read_csv, mock_legislators, mock_votes_results
):
    mock_legislators_read_csv.return_value = mock_legislators
    mock_votes_read_csv.return_value = mock_votes_results

    result = LegislatorServices.get_all()
    assert len(result) == 2
    assert result[0]["yes_bills"] == 1
    assert result[0]["no_bills"] == 1
    assert result[1]["yes_bills"] == 1
    assert result[1]["no_bills"] == 0


@patch("api.src.entities.legislators.services.LegislatorRepository.read_csv")
@patch("api.src.entities.legislators.services.VotesResultRepository.read_csv")
def test_legislators_services_get_all_with_name_filter(
    mock_votes_read_csv, mock_legislators_read_csv, mock_legislators, mock_votes_results
):
    mock_legislators_read_csv.return_value = mock_legislators
    mock_votes_read_csv.return_value = mock_votes_results

    result = LegislatorServices.get_all(name="Jônatas")
    assert len(result) == 1
    assert result[0]["name"] == "Jônatas Gomes"


@patch("api.src.entities.legislators.services.LegislatorRepository.read_csv")
@patch("api.src.entities.legislators.services.VotesResultRepository.read_csv")
def test_legislators_services_get_by_id(
    mock_votes_read_csv, mock_legislators_read_csv, mock_legislators, mock_votes_results
):
    mock_legislators_read_csv.return_value = mock_legislators
    mock_votes_read_csv.return_value = mock_votes_results

    result = LegislatorServices.get_by_id(1)
    assert result["name"] == "Jônatas Gomes"

    result = LegislatorServices.get_by_id(3)
    assert result is None


@patch("api.src.entities.legislators.services.LegislatorRepository.read_csv")
@patch("api.src.entities.legislators.services.VotesResultRepository.read_csv")
def test_legislators_services_get_legislator(
    mock_votes_read_csv, mock_legislators_read_csv, mock_legislators, mock_votes_results
):
    mock_legislators_read_csv.return_value = mock_legislators
    mock_votes_read_csv.return_value = mock_votes_results
    expected_result = {"id": 1, "name": "Jônatas Gomes", "no_bills": 1, "yes_bills": 1}
    legislator_id = "1"

    result = LegislatorServices.get_by_id(legislator_id)
    assert result == expected_result


@patch("api.src.entities.legislators.services.LegislatorRepository.read_csv")
@patch("api.src.entities.legislators.services.VotesResultRepository.read_csv")
def test_legislators_controller_get_all_legislators(
    mock_votes_read_csv, mock_legislators_read_csv, mock_legislators, mock_votes_results
):
    mock_legislators_read_csv.return_value = mock_legislators
    mock_votes_read_csv.return_value = mock_votes_results
    expected_result = [
        {"id": 1, "name": "Jônatas Gomes", "no_bills": 1, "yes_bills": 1},
        {"id": 2, "name": "Virgil Hawkins", "no_bills": 0, "yes_bills": 1},
    ]

    result = LegislatorController.get_all_legislators()
    assert result == expected_result


@patch("api.src.entities.legislators.services.LegislatorRepository.read_csv")
@patch("api.src.entities.legislators.services.VotesResultRepository.read_csv")
def test_legislators_controller_get_legislator(
    mock_votes_read_csv, mock_legislators_read_csv, mock_legislators, mock_votes_results
):
    mock_legislators_read_csv.return_value = mock_legislators
    mock_votes_read_csv.return_value = mock_votes_results
    expected_result = {"id": 1, "name": "Jônatas Gomes", "no_bills": 1, "yes_bills": 1}
    legislator_id = 1

    result = LegislatorController.get_legislator(legislator_id)
    assert result == expected_result


@patch("api.src.entities.legislators.services.LegislatorRepository.read_csv")
@patch("api.src.entities.legislators.services.VotesResultRepository.read_csv")
def test_legislators_controller_get_legislator_empty(
    mock_votes_read_csv, mock_legislators_read_csv, mock_legislators, mock_votes_results
):
    mock_legislators_read_csv.return_value = mock_legislators
    mock_votes_read_csv.return_value = mock_votes_results
    legislator_id = 3
    expected_status_code = 404
    try:
        LegislatorController.get_legislator(legislator_id)
    except HTTPException as e:
        assert e.status_code == expected_status_code
        assert e.detail == NOT_FOUND_MESSAGE


@patch("api.src.entities.legislators.services.LegislatorRepository.read_csv")
@patch("api.src.entities.legislators.services.VotesResultRepository.read_csv")
def test_legislators_routes_get_all_legislators(
    mock_votes_read_csv, mock_legislators_read_csv, mock_legislators, mock_votes_results
):
    mock_legislators_read_csv.return_value = mock_legislators
    mock_votes_read_csv.return_value = mock_votes_results
    response = client.get("/legislators/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


@patch("api.src.entities.legislators.services.LegislatorRepository.read_csv")
@patch("api.src.entities.legislators.services.VotesResultRepository.read_csv")
def test_legislators_routes_get_legislator(
    mock_votes_read_csv, mock_legislators_read_csv, mock_legislators, mock_votes_results
):
    mock_legislators_read_csv.return_value = mock_legislators
    mock_votes_read_csv.return_value = mock_votes_results
    legislator_id = 1

    response = client.get(f"/legislators/{legislator_id}")
    assert response.status_code == 200
    assert isinstance(response.json(), dict)
