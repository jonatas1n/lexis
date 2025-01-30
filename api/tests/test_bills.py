from fastapi import HTTPException, FastAPI
from unittest.mock import mock_open, patch
from fastapi.testclient import TestClient
from api.entities.bills import CSV_FILE, BillRepository, BillServices, BillController
from api.entities.bills.controllers import NOT_FOUND_MESSAGE
from api.entities.bills.routes import router

mock_csv_data = "id,name,amount\n1,Test Bill,100.0\n2,Another Bill,200.0\n"

app = FastAPI()
app.include_router(router, prefix="/bills")

client = TestClient(app)


def test_bills_repository_read_csv():
    expected_result = [
        {"id": 1, "name": "Test Bill", "amount": "100.0"},
        {"id": 2, "name": "Another Bill", "amount": "200.0"},
    ]

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.entities.bills.repositories.CSV_FILE", CSV_FILE):
            result = BillRepository.read_csv()
            assert result == expected_result


def test_bills_services_get_all():
    expected_result = [
        {"id": 1, "name": "Test Bill", "amount": "100.0"},
        {"id": 2, "name": "Another Bill", "amount": "200.0"},
    ]

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.entities.bills.repositories.CSV_FILE", CSV_FILE):
            result = BillServices.get_all()
            assert result == expected_result


def test_bills_services_get_bill():
    expected_result = {"id": 1, "name": "Test Bill", "amount": "100.0"}
    bill_id = 1

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.entities.bills.repositories.CSV_FILE", CSV_FILE):
            result = BillServices.get_by_id(bill_id)
            assert result == expected_result


def test_bills_controller_get_all_bills():
    expected_result = [
        {"id": 1, "name": "Test Bill", "amount": "100.0"},
        {"id": 2, "name": "Another Bill", "amount": "200.0"},
    ]

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.entities.bills.repositories.CSV_FILE", CSV_FILE):
            result = BillController.get_all_bills()
            assert result == expected_result


def test_bills_controller_get_bill():
    expected_result = {"id": 1, "name": "Test Bill", "amount": "100.0"}
    bill_id = 1

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.entities.bills.repositories.CSV_FILE", CSV_FILE):
            result = BillController.get_bill(bill_id)
            assert result == expected_result


def test_bills_controller_get_bill_empty():
    bill_id = 3
    expected_status_code = 404
    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.entities.bills.repositories.CSV_FILE", CSV_FILE):
            try:
                BillController.get_bill(bill_id)
            except HTTPException as e:
                assert e.status_code == expected_status_code
                assert e.detail == NOT_FOUND_MESSAGE


def test_bills_routes_get_all_bills():
    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.entities.bills.repositories.CSV_FILE", CSV_FILE):
            response = client.get("/bills/")
            assert response.status_code == 200
            assert isinstance(response.json(), list)


def test_bills_routes_get_bill():
    bill_id = 1
    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.entities.bills.repositories.CSV_FILE", CSV_FILE):
            response = client.get(f"/bills/{bill_id}")
            assert response.status_code == 200
            assert isinstance(response.json(), dict)
