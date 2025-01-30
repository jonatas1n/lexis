from .repositories import LegislatorRepository


class LegislatorServices:
    @staticmethod
    def get_all():
        return LegislatorRepository.read_csv()

    @staticmethod
    def get_by_id(legislator_id):
        legislator_id = int(legislator_id)
        legislators = LegislatorRepository.read_csv()
        return next(
            (
                legislator
                for legislator in legislators
                if legislator["id"] == legislator_id
            ),
            None,
        )
