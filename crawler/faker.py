import json
import time
from dateutil.parser import parse

from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

url = 'https://www.fakeaddressgenerator.com/usa_address_generator'

options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--incognito')
options.add_argument('--headless')
driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)


def writeJson(data, filename):
    with open(filename, 'w') as f:
        json.dump(data, f)
        print('done')


def removeSpecial(w: str):
    try:
        if w == '':
            return w
        parse(w, fuzzy=True)
        return w
    except Exception as e:
        return ''.join(char for char in w if char.isalnum())


def extract_cache_info():
    with open('./fakerweb.txt')as f:
        data = f.read()
        soup = BeautifulSoup(data, 'html.parser')
        content = soup.select('table')
        result = {}
        for c in content[:4]:
            nd = c.find('tbody')
            for rr in nd.select('tbody tr'):
                data = [removeSpecial(value.text) for value in rr.select('td')]
                if len(data) > 1:
                    result[data[0]] = data[1]
        print(result)


def extract_info(data):
    soup = BeautifulSoup(data, 'html.parser')
    content = soup.select('table')
    result = {}
    interest_tables = 4
    for c in content[:interest_tables]:
        nd = c.find('tbody')
        for rr in nd.select('tbody tr'):
            data = [removeSpecial(value.text) for value in rr.select('td')]
            if len(data) > 1:
                result[data[0].lower()] = data[1]
    return result


def run(total=1):
    output = []
    try:
        for i in range(total):
            driver.get(url)
            time.sleep(1)
            titles = driver.find_elements_by_class_name("title")[:1]
            for x in range(len(titles)):
                driver.execute_script("return document.readyState;", titles[x])
                page_source = driver.page_source
                output.append(extract_info(page_source))
        writeJson(output, 'faker.json')
    except Exception as e:
        print(f'error - {e}')


if __name__ == '__main__':
    count = 100
    run(count)
