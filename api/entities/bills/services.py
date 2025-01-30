from .repositories import BillRepository


class BillServices:
    @staticmethod
    def get_all():
        return BillRepository.read_csv()

    @staticmethod
    def get_by_id(bill_id):
        bill_id = str(bill_id)
        bills = BillRepository.read_csv()
        return next((bill for bill in bills if bill["id"] == bill_id), None)
