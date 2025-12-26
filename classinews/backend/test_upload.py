import requests

url = 'http://localhost:8000/upload'
files = {'file': ('test.csv', 'title,content\nTest Article,This is a test article content about technology.', 'text/csv')}

try:
    response = requests.post(url, files=files)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
