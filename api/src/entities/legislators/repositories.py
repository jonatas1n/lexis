import csv
from pathlib import Path

CSV_FILE = Path("data/legislators.csv")


class LegislatorRepository:
    @staticmethod
    def read_csv():
        with open(CSV_FILE, newline="", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            legislators = [{**row, "id": int(row["id"])} for row in reader]
            return legislators
