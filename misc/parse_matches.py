import requests
import json
import random
from bs4 import BeautifulSoup


import psycopg2
import time


class StoragePostgres:
    def __init__(self, host, port, database, user, password):
        self.connection = psycopg2.connect(
            host=host, port=port, database=database, user=user, password=password
        )
        print("Connected to PostgreSQL database")

    def execute(self, query: str, data=None):
        # print("Executing query: ", query)
        # print("Data: ", data)

        cursor = self.connection.cursor()

        if data:
            cursor.execute(query, data)
        else:
            cursor.execute(query)

        self.connection.commit()
        cursor.close()

    def fetch(self, query: str):
        print("Executing query: ", query)

        cursor = self.connection.cursor()
        cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()

        return result


storage_postgres = StoragePostgres(
    host="192.168.28.41",
    port=5432,
    database="se104",
    user="admin",
    password="admin",
)

mapping_team = {
    "Newcastle": "Newcastle United",
    "Brighton": "Brighton & Hove Albion",
    "Man Utd": "Manchester United",
    "Nott'm Forest": "Nottingham Forest",
    "Wolves": "Wolverhampton Wanderers",
    "Man City": "Manchester City",
    "West Ham": "West Ham United",
    "Spurs": "Tottenham Hotspur",
    "Sheffield Utd": "Sheffield United",
    "Luton": "Luton Town",
}


def get_matches():
    referees = storage_postgres.fetch("SELECT ref_id FROM referees")
    referees = [ref[0] for ref in referees]

    content = open("./data_matches.html", "r").read()
    soup = BeautifulSoup(content, "html.parser")

    dates = soup.find_all("div", class_="fixtures__date-container")

    for date_ele in dates:
        matches = date_ele.find_all("span", class_="match-fixture__container")
        time_ele = date_ele.find("time", class_="fixtures__date fixtures__date--long")

        date = time_ele.text
        date = int(time.mktime(time.strptime(date, "%A %d %B %Y")))

        for match in matches:
            teams = match.find_all("span", class_="match-fixture__short-name")
            score_ele = match.find("span", class_="match-fixture__score")

            team1 = mapping_team.get(teams[0].text, teams[0].text)
            team2 = mapping_team.get(teams[1].text, teams[1].text)
            score1 = int(score_ele.text.split("-")[0])
            score2 = int(score_ele.text.split("-")[1])

            # random a time in the date
            time_match = date + random.randint(0, 86400 - 7200)
            end_match = time_match + 90 * 60 + random.randint(0, 10) * 60

            team1_id = storage_postgres.fetch(
                f"SELECT club_id FROM clubs WHERE club_name = '{team1}'"
            )[0][0]
            team2_id = storage_postgres.fetch(
                f"SELECT club_id FROM clubs WHERE club_name = '{team2}'"
            )[0][0]

            players1 = storage_postgres.fetch(
                f"SELECT player_id FROM players WHERE player_club = '{team1_id}'"
            )
            players1 = [player[0] for player in players1]

            players2 = storage_postgres.fetch(
                f"SELECT player_id FROM players WHERE player_club = '{team2_id}'"
            )
            players2 = [player[0] for player in players2]

            if len(players1) == 0 or len(players2) == 0:
                continue

            # --------------
            match_id = storage_postgres.fetch(f"SELECT MAX(match_id) FROM matches")[0][
                0
            ]

            if match_id is None:
                match_id = 0

            match_id += 1

            ref_id = random.choice(referees)

            while True:
                var_id = random.choice(referees)
                if var_id != ref_id:
                    break

            while True:
                lineman_id = random.choice(referees)

                if lineman_id != ref_id and lineman_id != var_id:
                    break

            storage_postgres.execute(
                "INSERT INTO matches (match_id, team1, team2, ref_id, var_id, lineman_id, goal1, goal2, start, finish) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (
                    match_id,
                    team1_id,
                    team2_id,
                    ref_id,
                    var_id,
                    lineman_id,
                    score1,
                    score2,
                    time_match,
                    end_match,
                ),
            )

            for _ in range(score1):
                player_id = random.choice(players1)
                type_goal = random.choice(["A", "B", "C"])
                time_goal = random.randint(0, 90 * 60)

                storage_postgres.execute(
                    "INSERT INTO events (match_id, events, player_id, seconds) VALUES (%s, %s, %s, %s)",
                    (match_id, type_goal, player_id, time_goal),
                )

            for _ in range(score2):
                player_id = random.choice(players2)
                type_goal = random.choice(["A", "B", "C"])
                time_goal = random.randint(0, 90 * 60)

                storage_postgres.execute(
                    "INSERT INTO events (match_id, events, player_id, seconds) VALUES (%s, %s, %s, %s)",
                    (match_id, type_goal, player_id, time_goal),
                )


get_matches()
