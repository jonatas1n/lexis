import pytest
from fastapi import HTTPException, FastAPI
from unittest.mock import mock_open, patch
from fastapi.testclient import TestClient

from ..src.entities.bills import CSV_FILE, BillRepository, BillServices, BillController
from ..src.entities.bills.controllers import NOT_FOUND_MESSAGE
from ..src.entities.bills.routes import router

mock_csv_data = "id,title,sponsor_id\n1,Test Bill,1\n2,Another Bill,2\n"

app = FastAPI()
app.include_router(router)

client = TestClient(app)


@pytest.fixture
def mock_bills():
    return [
        {"id": 1, "title": "Bill 1", "sponsor_id": 1},
        {"id": 2, "title": "Bill 2", "sponsor_id": 2},
        {"id": 3, "title": "Another Bill", "sponsor_id": 1},
    ]


@pytest.fixture
def mock_votes():
    return [
        {"bill_id": 1, "id": 1},
        {"bill_id": 1, "id": 2},
        {"bill_id": 2, "id": 3},
    ]


@pytest.fixture
def mock_votes_results():
    return [
        {"id": 1, "legislator_id": 1, "vote_id": 201, "vote_type": 1},
        {"id": 2, "legislator_id": 1, "vote_id": 202, "vote_type": 2},
        {"id": 3, "legislator_id": 2, "vote_id": 203, "vote_type": 1},
    ]


def test_bills_repository_read_csv():
    expected_result = [
        {"id": 1, "title": "Test Bill", "sponsor_id": 1},
        {"id": 2, "title": "Another Bill", "sponsor_id": 2},
    ]

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.bills.repositories.CSV_FILE", new=CSV_FILE):
            result = BillRepository.read_csv()
            print(result)
            assert result == expected_result


@patch("api.src.entities.bills.repositories.BillRepository.read_csv")
@patch("api.src.entities.votes.repositories.VoteRepository.read_csv")
@patch("api.src.entities.votes_results.repositories.VotesResultRepository.read_csv")
def test_bills_services_get_all(
    mock_read_votes_results,
    mock_read_votes,
    mock_read_bills,
    mock_bills,
    mock_votes,
    mock_votes_results,
):
    mock_read_bills.return_value = mock_bills
    mock_read_votes.return_value = mock_votes
    mock_read_votes_results.return_value = mock_votes_results

    result = BillServices.get_all()
    assert len(result) == 3


@patch("api.src.entities.bills.repositories.BillRepository.read_csv")
@patch("api.src.entities.votes.repositories.VoteRepository.read_csv")
@patch("api.src.entities.votes_results.repositories.VotesResultRepository.read_csv")
def test_bills_service_get_all_with_title(
    mock_read_votes_results,
    mock_read_votes,
    mock_read_bills,
    mock_bills,
    mock_votes,
    mock_votes_results,
):
    mock_read_bills.return_value = mock_bills
    mock_read_votes.return_value = mock_votes
    mock_read_votes_results.return_value = mock_votes_results

    result = BillServices.get_all(title="Another")
    assert len(result) == 1
    assert result[0]["title"] == "Another Bill"


@patch("api.src.entities.bills.repositories.BillRepository.read_csv")
@patch("api.src.entities.votes.repositories.VoteRepository.read_csv")
@patch("api.src.entities.votes_results.repositories.VotesResultRepository.read_csv")
def test_bills_service_get_by_id(
    mock_read_votes_results,
    mock_read_votes,
    mock_read_bills,
    mock_bills,
    mock_votes,
    mock_votes_results,
):
    mock_read_bills.return_value = mock_bills
    mock_read_votes.return_value = mock_votes
    mock_read_votes_results.return_value = mock_votes_results

    result = BillServices.get_by_id(1)
    assert result["id"] == 1
    assert result["title"] == "Bill 1"

    try:
        BillServices.get_by_id(4)
    except Exception as e:
        assert e.detail == ""


@patch("api.src.entities.bills.repositories.BillRepository.read_csv")
@patch("api.src.entities.votes.repositories.VoteRepository.read_csv")
@patch("api.src.entities.votes_results.repositories.VotesResultRepository.read_csv")
def test_bills_controller_get_all_bills(
    mock_read_votes_results,
    mock_read_votes,
    mock_read_bills,
    mock_bills,
    mock_votes,
    mock_votes_results,
):
    mock_read_bills.return_value = mock_bills
    mock_read_votes.return_value = mock_votes
    mock_read_votes_results.return_value = mock_votes_results

    result = BillController.get_all_bills()
    assert result[0]["title"] == "Bill 1"


@patch("api.src.entities.bills.repositories.BillRepository.read_csv")
@patch("api.src.entities.votes.repositories.VoteRepository.read_csv")
@patch("api.src.entities.votes_results.repositories.VotesResultRepository.read_csv")
def test_bills_controller_get_bill(
    mock_read_votes_results,
    mock_read_votes,
    mock_read_bills,
    mock_bills,
    mock_votes,
    mock_votes_results,
):
    mock_read_bills.return_value = mock_bills
    mock_read_votes.return_value = mock_votes
    mock_read_votes_results.return_value = mock_votes_results
    expected_result = {
        "id": 1,
        "title": "Bill 1",
        "sponsor_id": 1,
        "no_votes": 0,
        "yes_votes": 0,
    }
    bill_id = 1

    result = BillController.get_bill(bill_id)
    assert result == expected_result


@patch("api.src.entities.bills.repositories.BillRepository.read_csv")
@patch("api.src.entities.votes.repositories.VoteRepository.read_csv")
@patch("api.src.entities.votes_results.repositories.VotesResultRepository.read_csv")
def test_bills_controller_get_bill_empty(
    mock_read_votes_results,
    mock_read_votes,
    mock_read_bills,
    mock_bills,
    mock_votes,
    mock_votes_results,
):
    mock_read_bills.return_value = mock_bills
    mock_read_votes.return_value = mock_votes
    mock_read_votes_results.return_value = mock_votes_results
    bill_id = 4
    expected_status_code = 404

    try:
        BillController.get_bill(bill_id)
    except HTTPException as e:
        assert e.status_code == expected_status_code
        assert e.detail == NOT_FOUND_MESSAGE


@patch("api.src.entities.bills.repositories.BillRepository.read_csv")
@patch("api.src.entities.votes.repositories.VoteRepository.read_csv")
@patch("api.src.entities.votes_results.repositories.VotesResultRepository.read_csv")
def test_bills_routes_get_all_bills(
    mock_read_votes_results,
    mock_read_votes,
    mock_read_bills,
    mock_bills,
    mock_votes,
    mock_votes_results,
):
    mock_read_bills.return_value = mock_bills
    mock_read_votes.return_value = mock_votes
    mock_read_votes_results.return_value = mock_votes_results
    response = client.get("/bills/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


@patch("api.src.entities.bills.repositories.BillRepository.read_csv")
@patch("api.src.entities.votes.repositories.VoteRepository.read_csv")
@patch("api.src.entities.votes_results.repositories.VotesResultRepository.read_csv")
def test_bills_routes_get_bill(
    mock_read_votes_results,
    mock_read_votes,
    mock_read_bills,
    mock_bills,
    mock_votes,
    mock_votes_results,
):
    mock_read_bills.return_value = mock_bills
    mock_read_votes.return_value = mock_votes
    mock_read_votes_results.return_value = mock_votes_results
    bill_id = 1

    response = client.get(f"/bills/{bill_id}")
    assert response.status_code == 200
    assert isinstance(response.json(), dict)
