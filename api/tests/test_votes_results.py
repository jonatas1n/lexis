from unittest.mock import mock_open, patch
from ..src.entities.votes_results import (
    CSV_FILE,
    VotesResultRepository,
    VotesResultServices,
)

mock_csv_data = "id,legislator_id,vote_id,vote_type\n1,1,201,1\n2,2,202,2\n"


def test_votes_results_repository_read_csv():
    expected_result = [
        {"id": 1, "legislator_id": 1, "vote_id": 201, "vote_type": 1},
        {"id": 2, "legislator_id": 2, "vote_id": 202, "vote_type": 2},
    ]

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.votes_results.repositories.CSV_FILE", CSV_FILE):
            result = VotesResultRepository.read_csv()
            assert result == expected_result


def test_votes_results_services_get_all():
    expected_result = [
        {"id": 1, "legislator_id": 1, "vote_id": 201, "vote_type": 1},
        {"id": 2, "legislator_id": 2, "vote_id": 202, "vote_type": 2},
    ]

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.votes_results.repositories.CSV_FILE", CSV_FILE):
            result = VotesResultServices.get_all()
            assert result == expected_result


def test_votes_results_services_get_votes_result():
    expected_result = {"id": 1, "legislator_id": 1, "vote_id": 201, "vote_type": 1}
    votes_result_id = "1"

    with patch("builtins.open", mock_open(read_data=mock_csv_data)):
        with patch("api.src.entities.votes_results.repositories.CSV_FILE", CSV_FILE):
            result = VotesResultServices.get_by_id(votes_result_id)
            assert result == expected_result
