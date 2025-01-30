from .repositories import VotesResultRepository


class VotesResultServices:
    @staticmethod
    def get_all():
        return VotesResultRepository.read_csv()

    @staticmethod
    def get_by_id(vote_result_id):
        vote_result_id = int(vote_result_id)
        vote_results = VotesResultRepository.read_csv()
        return next(
            (
                vote_result
                for vote_result in vote_results
                if vote_result["id"] == vote_result_id
            ),
            None,
        )
