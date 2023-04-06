# IOT Endpoints
## IOT management

### iot/auth/register
* User with role *user* must be signed in
* Endpoint must be called with token
* Name of User with the role *iot* must be unique
#### Input:
`{
	"name":"meteo1",
	"password":"123456"
}`

### iot/auth/login
#### Input:
`{
	"name":"meteo1",
	"password":"123456"
}`
### iot/iot/remove
* User with role *user* must be signed in
* Endpoint must be called with token
*  BE checks if the endpoint is called by a user who is related (owner) to a certain IoT
`{
	"id": 12
}`
### iot/iot/get
* All IoTs in DB are sent back

### iot/iot/check
* IN PROGRESS

## IOT data
### iot/data/post
#### Input:
**_ONLY user with role IOT_**
`{
	"value":11,
	"type":"temperature",
	"location": "Pv",
	"date": "2023-04-01 09:40:45"
	}`

# FE Endpoints
## Fetching data
### iot/data/get
* Returns back last mesuered data in DB
*  `{
	"statusCode": 200,
	"message": "OK",
	"data": {
		"location": "Pv",
		"temperature": 10,
		"dateTemp": "2023-04-01T07:40:45.000Z",
		"humidity": 10,
		"dateHum": "2023-04-01T07:40:45.000Z"
	}
}`
#### Input:
`N/A`

### iot/data/getMany
#### Params

| Param | Type  | Description | Sample |
| ----------- | ---------- |----------- | --- |
| type | string | temperature, humidity | temperature, humidity |
| userId | number | id of iot user in DB | 1 |
| startDate | Date | start of interval | 2023-04-02T17:25:41.000Z |
| endDate | Date | end of interval | 2023-04-05T17:25:41.000Z |
| granularity | number | granularity | 5 |
| granularityUnit | string | time unit | minutes, hours, days |

`http://localhost:3333/iot/data/getMany?type=temperature,humidity&userId=1&startDate=2023-04-04T18%3A14%3A12%2B02%3A00&endDate=2023-04-06T18%3A14%3A12%2B02%3A00&granularity=10&granularityUnit=minutes`
