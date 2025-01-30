from .repositories import VoteRepository


class VoteServices:
    @staticmethod
    def get_all():
        return VoteRepository.read_csv()

    @staticmethod
    def get_by_id(vote_id):
        vote_id = int(vote_id)
        votes = VoteRepository.read_csv()
        return next((vote for vote in votes if vote["id"] == vote_id), None)
