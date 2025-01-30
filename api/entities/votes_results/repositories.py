import csv
from pathlib import Path

CSV_FILE = Path("data/vote_results.csv")


class VotesResultRepository:
    @staticmethod
    def read_csv():
        with open(CSV_FILE, newline="", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            vote_results = []
            for row in reader:
                vote_results.append({key: int(value) for key, value in row.items()})
            return vote_results
