import csv
from pathlib import Path

CSV_FILE = Path("data/votes.csv")


class VoteRepository:
    @staticmethod
    def read_csv():
        with open(CSV_FILE, newline="", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            votes = [
                {"id": int(row["id"]), "bill_id": int(row["bill_id"])} for row in reader
            ]
            return votes
