
# Let me try to access the glowheal.in website directly using requests
import requests
from bs4 import BeautifulSoup

url = "https://glowheal.in"

try:
    # Set headers to mimic browser
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    response = requests.get(url, headers=headers, timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"Content Length: {len(response.content)}")
    print("\n--- First 2000 characters of content ---")
    print(response.text[:2000])
    
except Exception as e:
    print(f"Error accessing website: {e}")
