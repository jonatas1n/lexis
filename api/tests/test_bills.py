from unittest.mock import mock_open, patch
from api.entities.bills.repositories import BillRepository, CSV_FILE

def test_bills_repository_read_csv():
    mock_csv_data = "id,name,amount\n1,Test Bill,100.0\n2,Another Bill,200.0\n"
    expected_result = [
        {"id": "1", "name": "Test Bill", "amount": "100.0"},
        {"id": "2", "name": "Another Bill", "amount": "200.0"}
    ]

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.entities.bills.repositories.CSV_FILE", CSV_FILE):
            result = BillRepository.read_csv()
            assert result == expected_result
