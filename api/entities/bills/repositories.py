import csv
from pathlib import Path

CSV_FILE = Path("data/bills.csv")


class BillRepository:
    @staticmethod
    def read_csv():
        with open(CSV_FILE, newline="", encoding="utf-8") as file:
            return list(csv.DictReader(file))
