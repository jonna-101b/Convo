import requests


# curl -X POST http://localhost:8080/api/auth/register \
#   -H "Content-Type: application/json" \
#   -d '{
#     "username": "john_doe",
#     "email": "john@example.com",
#     "password": "SecurePass123",
#     "firstName": "John",
#     "lastName": "Doe"
#   }'
x = requests.post(
    "http://localhost:8080/api/auth/register",
    json={
        "username": "john_doe",
        "email": "john2@example.com",
        "password": "SecurePass123",
        "firstName": "John",
        "lastName": "Doe",
    },
)

print(x.status_code)
print(x.json())
