import requests
import json
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


# https://www.premierleague.com/clubs
data = json.load(
    open("/home/bao/Documents/UIT/SE104/Final/frontend/src/data/teams_info.json")
)
res = requests.get("https://www.premierleague.com/clubs")
soup = BeautifulSoup(res.text, "html.parser")

# club-card club-card--t3  indexItem t3
clubs = soup.find_all("a", class_="club-card")

for club in clubs:
    club_name = club.find("h2", class_="club-card__name").text
    club_url = club["href"]
    res = requests.get(f"https://www.premierleague.com{club_url}")
    soup = BeautifulSoup(res.text, "html.parser")

    print(club_url)

    # club-header__team-name
    short_name = data[club_name]["shortName"]
    logo_low = data[club_name]["logo"]
    logo_high = data[club_name]["logo_high"]

    # add club to database
    if not storage_postgres.fetch(
        f"SELECT * FROM clubs WHERE club_name = '{club_name}'"
    ):
        storage_postgres.execute(
            "INSERT INTO clubs (club_name, club_shortname, total_player, manager, logo_high, logo_low) VALUES (%s, %s, %s, %s, %s, %s)",
            (club_name, short_name, 0, 7, logo_high, logo_low),
        )

    # player page
    player_url = club_url.replace("/overview", "") + "/squad?se=578"
    res = requests.get(f"https://www.premierleague.com{player_url}")
    soup = BeautifulSoup(res.text, "html.parser")

    # squad-list__position-container
    positions = soup.find_all("div", class_="squad-list__position-container")
    club_id = storage_postgres.fetch(
        f"SELECT club_id FROM clubs WHERE club_name = '{club_name}'"
    )[0][0]

    for position in positions:
        position_name = position.find("h1", class_="squad-list__position-header").text
        players = position.find_all("li", class_="stats-card")

        for player in players:
            try:
                first_name = player.find("div", class_="stats-card__player-first").text
                last_name = player.find("div", class_="stats-card__player-last").text
                country = player.find("span", class_="stats-card__player-country").text
                number = player.find("div", class_="stats-card__squad-number").text
                url_player = player.find("a", class_="stats-card__wrapper")["href"]
            except Exception as e:
                print(e)
                continue

            if first_name == "" or last_name == "" or country == "" or number == "":
                continue

            # replace ' in name
            first_name = first_name.replace("'", " ")
            last_name = last_name.replace("'", " ")

            # access player page to get birthdate
            try:
                res = requests.get(f"https://www.premierleague.com{url_player}")
                soup = BeautifulSoup(res.text, "html.parser")
                birthdate = (
                    soup.findAll("div", class_="player-info__info")[1]
                    .text.strip()
                    .split(" ")[0]
                )

                # convert birthdate to date
                birthdate = time.strptime(birthdate, "%d/%m/%Y")
                birthdate = time.mktime(birthdate)
                birthdate = int(birthdate)
            except Exception as e:
                print(e)
                continue

            max_id = storage_postgres.fetch("SELECT MAX(player_id) FROM players")[0][0]

            if not storage_postgres.fetch(
                f"SELECT * FROM players WHERE player_name = '{first_name} {last_name}' AND player_club = {club_id} AND player_pos = '{position_name}' AND player_nation = '{country}' AND js_number = '{number}'"
            ):
                storage_postgres.execute(
                    "INSERT INTO players (player_name, player_club, player_pos, player_nation, js_number, player_id, player_bday) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                    (
                        f"{first_name} {last_name}",
                        club_id,
                        position_name,
                        country,
                        number,
                        max_id + 1,
                        birthdate,
                    ),
                )

    time.sleep(2)
