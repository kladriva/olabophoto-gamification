# Dockerfile for the FastAPI application (backend)

# Use a Python base image
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# IMPORTANT: Install necessary system dependencies for mysqlclient
# apt-get update refreshes the package list
# apt-get install -y installs the packages
# build-essential: for compilation tools like gcc
# pkg-config: to find library configurations
# libmysqlclient-dev: development headers for the MySQL client library
# && rm -rf /var/lib/apt/lists/*: Cleans up the APT cache to reduce image size
RUN apt-get update && \
    apt-get install -y \
        build-essential \
        pkg-config \
        libmariadb-dev-compat \
        libmariadb-dev && \
    rm -rf /var/lib/apt/lists/*

# Copy the requirements file to install Python dependencies
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files
COPY . .

# Expose the default port for FastAPI (Uvicorn)
EXPOSE 8000

# Command to start the Uvicorn application
# --host 0.0.0.0 is necessary for the app to be accessible from outside the container
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]