import requests

def getCoordinate(keyword):
    query = ""
    splited_keyword = keyword.split(" ")
    if len(splited_keyword) > 3:
        query = f"{splited_keyword[0]} {splited_keyword[1]} {splited_keyword[2]}"
    else:
        query = keyword
    

    headers = {
        'Authorization': 'KakaoAK 29ab21f73213a928ca0e4dcee2396f96',
        'KA': 'sdk/v2 os/javascript lang/ko device/web origin/http://localhost:8080'
    }

    url = f"http://dapi.kakao.com/v2/local/search/keyword.json?query={query}&page=1&size=15"
    response = requests.get(url, headers=headers)
    res_list = response.json().get('documents')
    if res_list:
        return f"[{res_list[0].get('y')},{res_list[0].get('x')}]"
    return "[위치정보없음]"
