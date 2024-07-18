# API server

## Endpoints

- [GET] `/api/coordinate?address={value}`

    ``` json
    [
        "status": ["ok", "error"],
        "result": [
            {
                "name": "address from googlemaps api",
                "lat": float,
                "lng": float,
            },
            ...
        ]
        "error": [
            "error message",
            ...
        ]
    ]
    ```
