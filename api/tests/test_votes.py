from unittest.mock import mock_open, patch
from ..src.entities.votes import CSV_FILE, VoteRepository, VoteServices

mock_csv_data = "id,bill_id\n1,2900994\n2,2900995\n"


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
