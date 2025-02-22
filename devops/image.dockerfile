FROM python:3.11-slim
RUN apt-get update && apt-get install -y \
    build-essential \
    libmariadb-dev-compat \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /api
COPY . /api

RUN python -m venv /api/venv
RUN /api/venv/bin/pip install --no-cache-dir -r requirements.txt

EXPOSE 3000
CMD ["/api/venv/bin/python", "chillzone/manage.py", "runserver", "0.0.0.0:3000"]