from datetime import datetime


class TimelineService:

    def current_time(self):

        return datetime.now().strftime("%d-%m-%Y %H:%M:%S")


timeline_service = TimelineService()