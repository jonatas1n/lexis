import csv

data_path = "./data"


def load_data(file_path, key_label="id"):
    data_dict = {}
    with open(file_path, "r") as file:
        csv_file = csv.DictReader(file)
        for lines in csv_file:
            key = lines[key_label]
            data_dict[key] = lines
    return data_dict
