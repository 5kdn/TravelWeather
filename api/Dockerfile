FROM python:3.12-slim AS base
ARG PY_VERSION="3.12"
ARG WORKDIR=/app

ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8
WORKDIR ${WORKDIR}
RUN pip install --upgrade pip


FROM base AS builder
# # if you need
# RUN apt update && apt upgrade -y && \
#     apt install -y --no-install-recommends \
#         libpq5 \
#         libxml2 \
#     && apt clean && rm -rf /var/lib/apt/lists/*
RUN pip --no-cache-dir install pipenv
COPY Pipfile Pipfile.lock ./
RUN pipenv requirements > requirements.lock
RUN pip install --no-cache-dir -r requirements.lock


FROM builder AS dev-builder
RUN pipenv requirements --dev > requirements.dev.lock
RUN pip install --no-cache-dir -r requirements.dev.lock


FROM base AS dev
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONFAULTHANDLER 1
COPY --from=dev-builder /usr/local/lib/python${PY_VERSION}/site-packages /usr/local/lib/python${PY_VERSION}/site-packages
EXPOSE 8000
CMD ["python", "-m", "uvicorn", "src.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]


FROM base AS prod
COPY --from=builder /usr/local/lib/python${PY_VERSION}/site-packages /usr/local/lib/python${PY_VERSION}/site-packages
COPY . .
CMD ["python", "-m", "uvicorn",  "src.main:app", "--uds", "/tmp/uvicorn.sock"]
