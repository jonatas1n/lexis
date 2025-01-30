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

app = FastAPI()
app.include_router(router)

client = TestClient(app)


def test_legislators_repository_read_csv():
    expected_result = [
        {"id": 1, "name": "Test Legislator"},
        {"id": 2, "name": "Another Legislator"},
    ]

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.legislators.repositories.CSV_FILE", CSV_FILE):
            result = LegislatorRepository.read_csv()
            assert result == expected_result


def test_legislators_services_get_all():
    expected_result = [
        {"id": 1, "name": "Test Legislator"},
        {"id": 2, "name": "Another Legislator"},
    ]

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.legislators.repositories.CSV_FILE", CSV_FILE):
            result = LegislatorServices.get_all()
            assert result == expected_result


def test_legislators_services_get_legislator():
    expected_result = {"id": 1, "name": "Test Legislator"}
    legislator_id = "1"

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.legislators.repositories.CSV_FILE", CSV_FILE):
            result = LegislatorServices.get_by_id(legislator_id)
            assert result == expected_result


def test_legislators_controller_get_all_legislators():
    expected_result = [
        {"id": 1, "name": "Test Legislator"},
        {"id": 2, "name": "Another Legislator"},
    ]

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.legislators.repositories.CSV_FILE", CSV_FILE):
            result = LegislatorController.get_all_legislators()
            assert result == expected_result


def test_legislators_controller_get_legislator():
    expected_result = {"id": 1, "name": "Test Legislator"}
    legislator_id = 1

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.legislators.repositories.CSV_FILE", CSV_FILE):
            result = LegislatorController.get_legislator(legislator_id)
            assert result == expected_result


def test_legislators_controller_get_legislator_empty():
    legislator_id = 3
    expected_status_code = 404
    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.legislators.repositories.CSV_FILE", CSV_FILE):
            try:
                LegislatorController.get_legislator(legislator_id)
            except HTTPException as e:
                assert e.status_code == expected_status_code
                assert e.detail == NOT_FOUND_MESSAGE


def test_legislators_routes_get_all_legislators():
    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.legislators.repositories.CSV_FILE", CSV_FILE):
            response = client.get("/legislators/")
            assert response.status_code == 200
            assert isinstance(response.json(), list)


def test_legislators_routes_get_legislator():
    legislator_id = 1
    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.legislators.repositories.CSV_FILE", CSV_FILE):
            response = client.get(f"/legislators/{legislator_id}")
            assert response.status_code == 200
            assert isinstance(response.json(), dict)
