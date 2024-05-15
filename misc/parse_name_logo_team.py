from bs4 import BeautifulSoup
import json


content = open("./teams_info.txt").read()
soup = BeautifulSoup(content, "html.parser")
results = {}


# find all img tags
imgs = soup.find_all("img")
names = soup.find_all("div", class_="team-index__club-name")

for img, name in zip(imgs, names):
    team = {}
    team["name"] = name.get_text()
    team["logo"] = img["src"]
    results[team["name"]] = team


json.dump(results, open("../data/teams_info.json", "w"), indent=4)
