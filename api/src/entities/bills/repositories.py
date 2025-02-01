import csv
from pathlib import Path

CSV_FILE = Path("data/bills.csv")


class BillRepository:
    @staticmethod
    def read_csv():
        with open(CSV_FILE, newline="", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            bills = [
                {**row, "id": int(row["id"]), "sponsor_id": int(row["sponsor_id"])}
                for row in reader
            ]
            return bills
