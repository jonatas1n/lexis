import pytest
from fastapi import HTTPException, FastAPI
from unittest.mock import mock_open, patch
from fastapi.testclient import TestClient

from ..src.entities.bills import CSV_FILE, BillRepository, BillServices, BillController
from ..src.entities.bills.controllers import NOT_FOUND_MESSAGE
from ..src.entities.bills.routes import router

mock_csv_data = "id,name,amount\n1,Test Bill,100.0\n2,Another Bill,200.0\n"

app = FastAPI()
app.include_router(router)

client = TestClient(app)


@pytest.fixture
def mock_bills():
    return [
        {"id": 1, "title": "Bill 1"},
        {"id": 2, "title": "Bill 2"},
        {"id": 3, "title": "Another Bill"},
    ]


@pytest.fixture
def mock_votes():
    return [
        {"bill_id": 1, "id": 1, "vote_id": 4, "vote_type": 2},
        {"bill_id": 1, "id": 2, "vote_id": 5, "vote_type": 2},
        {"bill_id": 2, "id": 3, "vote_id": 6, "vote_type": 2},
    ]


def test_bills_repository_read_csv():
    expected_result = [
        {"id": 1, "name": "Test Bill", "amount": "100.0"},
        {"id": 2, "name": "Another Bill", "amount": "200.0"},
    ]

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.bills.repositories.CSV_FILE", CSV_FILE):
            result = BillRepository.read_csv()
            assert result == expected_result


@patch("..services.BillRepository.read_csv")
@patch("..services.VoteRepository.read_csv")
def test_bills_services_get_all(
    mock_read_votes, mock_read_bills, mock_bills, mock_votes
):
    mock_read_bills.return_value = mock_bills
    mock_read_votes.return_value = mock_votes

    result = BillServices.get_all()
    assert len(result) == 3
    assert result[0]["votes"] == 2
    assert result[1]["votes"] == 1
    assert result[2]["votes"] == 0


@patch("..services.BillRepository.read_csv")
@patch("..services.VoteRepository.read_csv")
def test_bills_service_get_all_with_title(
    mock_read_votes, mock_read_bills, mock_bills, mock_votes
):
    mock_read_bills.return_value = mock_bills
    mock_read_votes.return_value = mock_votes

    result = BillServices.get_all(title="Bill")
    assert len(result) == 2
    assert result[0]["title"] == "Bill 1"
    assert result[1]["title"] == "Bill 2"


@patch("..services.BillRepository.read_csv")
def test_bills_service_get_by_id(mock_read_bills, mock_bills):
    mock_read_bills.return_value = mock_bills

    result = BillServices.get_by_id(1)
    assert result["id"] == 1
    assert result["title"] == "Bill 1"

    result = BillServices.get_by_id(4)
    assert result is None


@patch("..services.BillRepository.read_csv")
@patch("..services.VoteRepository.read_csv")
def test_bills_controller_get_all_bills(
    mock_read_votes, mock_read_bills, mock_bills, mock_votes
):
    mock_read_bills.return_value = mock_bills
    mock_read_votes.return_value = mock_votes

    result = BillController.get_all_bills()
    assert result[0]["title"] == "Bill 1"


def test_bills_controller_get_bill():
    expected_result = {"id": 1, "name": "Test Bill", "amount": "100.0"}
    bill_id = 1

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.bills.repositories.CSV_FILE", CSV_FILE):
            result = BillController.get_bill(bill_id)
            assert result == expected_result


def test_bills_controller_get_bill_empty():
    bill_id = 3
    expected_status_code = 404
    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.bills.repositories.CSV_FILE", CSV_FILE):
            try:
                BillController.get_bill(bill_id)
            except HTTPException as e:
                assert e.status_code == expected_status_code
                assert e.detail == NOT_FOUND_MESSAGE


def test_bills_routes_get_all_bills():
    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.bills.repositories.CSV_FILE", CSV_FILE):
            response = client.get("/bills/")
            assert response.status_code == 200
            assert isinstance(response.json(), list)


def test_bills_routes_get_bill():
    bill_id = 1
    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.bills.repositories.CSV_FILE", CSV_FILE):
            response = client.get(f"/bills/{bill_id}")
            assert response.status_code == 200
            assert isinstance(response.json(), dict)
