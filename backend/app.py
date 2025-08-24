from fastapi import FastAPI
import os
import psycopg2

app = FastAPI()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASS = os.getenv("DB_PASS", "postgres")
DB_NAME = os.getenv("DB_NAME", "finapi")

@app.get("/")
def health():
    return {"status": "ok"}

@app.get("/users")
def get_users():
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASS,
            dbname=DB_NAME
        )
        cur = conn.cursor()
        cur.execute("SELECT 'user1' as name")
        result = cur.fetchall()
        conn.close()
        return {"users": result}
    except Exception as e:
        return {"error": str(e)}
