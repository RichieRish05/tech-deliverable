from contextlib import asynccontextmanager
from datetime import datetime
from typing import AsyncIterator

from fastapi import FastAPI, Form, status, HTTPException
from fastapi.responses import RedirectResponse, StreamingResponse
from typing_extensions import TypedDict

from services.database import JSONDatabase
from datetime import datetime, timedelta


class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("api/data/database.json")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Handle database management when running app."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []

    yield

    database.close()


app = FastAPI(lifespan=lifespan)


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> RedirectResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now()
    quote = Quote(name=name, message=message, time=now.isoformat(timespec="seconds"))
    print(quote)
    database["quotes"].append(quote)

    # You may modify the return value as needed to support other functionality
    return RedirectResponse("/", status.HTTP_303_SEE_OTHER)



@app.get("/getquotes")
def generate_quotes(max_age: str):
    """
    Return quotes from the database based on the max age.
    """

    ages = {
        'day': timedelta(days=1),
        'week': timedelta(days=7),
        'month': timedelta(days=30),
        'year': timedelta(days=365),
        'all': datetime.min
    }
    
    # Get the cutoff date
    cutoff = ages['all'] if max_age == 'all' else datetime.now() - ages[max_age]

    
    # Filter the quotes
    filtered_quotes = [quote for quote in database['quotes'] if datetime.fromisoformat(quote['time']) >= cutoff]


    # Reverse the list to get the newest quotes first
    return filtered_quotes[::-1]











# for quote in generate_quotes('week'):
#     print(quote)

